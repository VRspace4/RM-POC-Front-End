import {Client, Consumer, ConsumerOptions, HighLevelProducer, Offset, ProduceRequest, Topic} from "kafka-node";
import {Customer} from "../../../app/es-demo/models/customer";
import {KafkaGlobals} from "../../../app/app.globals";
import {RmCommandController} from "./rm-command-controller.service";
import {ReturnWithVerification} from "../../../app/es-demo/types/return-with-verifcation";
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";
import {VerificationOutput} from "../../../app/es-demo/types/verification-output";
import {EventAndMsgOffset} from "../../../app/es-demo/types/event-and-msg-offset.type";
import {ReturnWithResponseMsg} from "../../../app/es-demo/types/return-with-response-message.type";
import {ResponseMessage, ResponseMessageType} from "../../../app/es-demo/types/response-message";


export class RmMessageProducer {
private static client: Client;
private static producer: HighLevelProducer;

static createClient(): void {
  RmMessageProducer.client = new Client(KafkaGlobals.uri, 'rm-demo-command', {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });
}

/**
 * Start the Kafka Producer server
 * @returns {Promise<void>}
 */
static startProducerClient(): Promise<void> {
  return new Promise<void>(function(resolve, reject) {
    console.log('Starting message producer...');

    RmMessageProducer.producer = new HighLevelProducer(RmMessageProducer.client);

    RmMessageProducer.producer.on('ready', function() {
      console.log('Producer is ready...');
      resolve();
    });

    RmMessageProducer.producer.on('error', function(error) {
      console.error(error);
      reject(error);
    });

    process.on('SIGINT', function () {
      console.log('Shutting down message producer...');
      RmMessageProducer.producer.close(function () {
        process.exit();
      });
    });

    // For nodemon restarts..
    process.once('SIGUSR2', function () {
      RmMessageProducer.producer.close(function () {
        console.log('Restarting message producer...');
        process.kill(process.pid, 'SIGUSR2');
      });
    });
  });
}

/**
 * Get all events from the broker starting at the given input parameter
 * @param startingOffsetNum
 * @returns {Promise<Array<EventAndMsgOffset>>}
 */
public static fetchEventsFromOffset(startingOffsetNum: number): Promise<Array<EventAndMsgOffset>> {
  return new Promise<Array<EventAndMsgOffset>>((resolve, reject) => {

    const promiseOutput: EventAndMsgOffset[] = [];

    const topics: Array<Topic> = [{
        topic: KafkaGlobals.topicName,
      offset: startingOffsetNum,
      autoCommit: false
    }];

    const options: ConsumerOptions = {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: true
    };

    // Fetch the latest offset so we know when to stop
    RmMessageProducer.createClient();
    const offset = new Offset(RmMessageProducer.client);
    let latestOffsetNum: number;
    offset.fetchLatestOffsets([KafkaGlobals.topicName], (error, data) => {
      if (error) {
        reject(error);
      } else {
        latestOffsetNum = data[KafkaGlobals.topicName][KafkaGlobals.topicPartition.toString()];
      }
    });

    // Begin retrieving all the events
    const consumer = new Consumer(RmMessageProducer.client, topics, options);
    let eventMsgOffset = startingOffsetNum;

    consumer.on('message', function (message: any) {
      let event: EsEvent;
      try {
        event = JSON.parse(message.value);
      } catch (e) {
        // Ignore error
        return;
      } finally {
        if (typeof event !== "undefined") {
          const msgOffset: number = parseInt(message.offset, 10);
          promiseOutput.push(new EventAndMsgOffset(event, msgOffset));
        }

        if (eventMsgOffset >= latestOffsetNum - 1) {
          consumer.close(false, () => {
          });
          resolve(promiseOutput);
        }
        eventMsgOffset++;
      }
    });

    consumer.on('error', function (err) {
      reject(err);
    });
  });
}

static serializeEvent(event: EsEvent): string {
  const cloneEvent = JSON.parse(JSON.stringify(event));
  delete cloneEvent.rootModel;
  return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
}

public static commitEvents(events: EsEvent[]): Promise<ReturnWithResponseMsg<number>> {
    const jsonString: string[] = [];

    events.forEach((event: EsEvent) => {
      jsonString.push(JSON.stringify(event));
    });

    // Create payload
    const payload: ProduceRequest[] = [{
      topic: KafkaGlobals.topicName,
      partition: parseInt(KafkaGlobals.topicPartition, 10),
      messages: jsonString,
      attributes: 1
    }];

    return new Promise<ReturnWithResponseMsg<number>>((resolve, reject) => {
      RmMessageProducer.producer.send(payload, function (error, result) {
        const output = new ReturnWithResponseMsg<number>();

        const resultVerify = new ResponseMessage();
        let resultMsgOffset = -1;
        console.log('Sent payload to broker: ', payload);
        if (error) {
          resultVerify.type = ResponseMessageType[ResponseMessageType.error];
          resultVerify.title = `Error while committing`;
          resultVerify.message = `Unable to commit message to broker: ${error}`;
        } else {
          resultVerify.type = ResponseMessageType[ResponseMessageType.success];
          resultVerify.title = 'Commit successful';
          resultVerify.message = `The event(s) have been committed successfully!`;
          resultMsgOffset = result[KafkaGlobals.topicName][KafkaGlobals.topicPartition];
        }
        output.responseMessage = resultVerify;
        output.output = resultMsgOffset;

        resolve(output);
      });
    });
  };
}

