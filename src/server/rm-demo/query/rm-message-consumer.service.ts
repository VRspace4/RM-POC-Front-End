import {Consumer, KeyedMessage, Client, ZKOptions, Topic, ConsumerOptions} from 'kafka-node';
import {KafkaGlobals} from "../../../app/app.globals";
import {BrokerMessage} from "../../../app/es-demo/types/broker-message.type";
import {RootModel} from "../../../app/es-demo/models/root-model";
import {RmQueryController} from "./rm-query-controller.service";
import * as Rx from 'rxjs/Rx';
import {VerificationOutput} from "../../../app/es-demo/types/verification-output";
import {RootModelAddedEvent} from "../../../app/es-demo/events/root-model-added-event";
import {RmCommandController} from "../command/rm-command-controller.service";
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";

export class RmMessageConsumer {

  static startConsumingEvents(rootModel: RootModel, startFromOffset: number,
                              onMessageCallback: (message: BrokerMessage) => void): void {
    console.log('Starting message consumer...');
    const client = new Client(KafkaGlobals.uri, 'rm-demo-query');

    const topics: Array<Topic> = [{
      topic: KafkaGlobals.topicName,
      offset: startFromOffset
    }];

    const options: ConsumerOptions = {
      autoCommit: false,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: true
    };

    const consumer = new Consumer(client, topics, options);



    consumer.on('message', onMessageCallback);

    consumer.on('error', function (err) {
      console.log('error', err);
    });

    process.on('SIGINT', function () {
      console.log('Shutting down message consumer...');
      consumer.close(true, function () {
        process.exit();
      });
    });


    // For nodemon
    process.once('SIGUSR2', function () {
      consumer.close(false, function () {
        console.log('Restarting message consumer...');
        process.kill(process.pid, 'SIGUSR2');
      });
    });
  }

  static processRawEventToRootModel(rawEvent: any, rootModel: RootModel): VerificationOutput {
      const processingResult = new VerificationOutput();
      let jsonEvent: EsEvent;
      try {
        jsonEvent = JSON.parse(rawEvent);
      } catch (e) {
        processingResult.passed = false;
        processingResult.failedMessage = 'Invalid JSON string';
      }

      if (jsonEvent) {
        const deserializationResult = RmCommandController.deserializeEvent(jsonEvent, null);
        if (deserializationResult.verificationResult.passed) {
          if (deserializationResult.output instanceof RootModelAddedEvent) {
            for (const keyName in deserializationResult.output.rootModel) {
              if (rootModel.hasOwnProperty(keyName)) {
                rootModel[keyName] = deserializationResult.output.rootModel[keyName];
              }
            }
          } else if (rootModel.name !== '') {
            deserializationResult.output.rootModel = rootModel;
            try {
              deserializationResult.output.process();
            } catch (e) {
              console.error('Skipping the following event: ', deserializationResult.output.name);
              // console.error(e);
            }
          }
        } else {
          processingResult.passed = false;
          processingResult.failedMessage = `Unable to apply the raw event into the root model, ${rawEvent}.`
            + ` ${deserializationResult.verificationResult.failedMessage}`;
        }
      }

    return processingResult;

  }


}
