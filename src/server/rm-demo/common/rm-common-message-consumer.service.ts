import {HighLevelConsumer, KeyedMessage, Client, ZKOptions, Topic, ConsumerOptions, Consumer} from 'kafka-node';
import {KafkaGlobals} from "../../../app/app.globals";

export class RmMessageConsumer {
  static startServer() {
    setTimeout(() => {
      console.log(`Starting message consumer on topic, ${KafkaGlobals.topicName}...`);
      const client = new Client(KafkaGlobals.uri, 'rm-demo-test-client-test-1');

      const topics: Array<Topic> = [{
        topic: KafkaGlobals.topicName,
        offset: 0,
        autoCommit: false
      }];

      const options: ConsumerOptions = {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: true
      };

      const consumer = new Consumer(client, topics, options);

      consumer.on('message', function (message: any) {
        console.log('message: ', message.offset, JSON.parse(message.value));
      });

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

    }, 3000);
  }

}
