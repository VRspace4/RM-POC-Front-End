import {Client, HighLevelProducer} from "kafka-node";
import {Customer} from "../../../app/es-demo/models/customer";
import {KafkaGlobals} from "../../../app/app.globals";

// export class MessageProducer {
//   static brokerURI = KafkaGlobals.
// }
// Kafka producer
setTimeout(() => {
  console.log('Starting message producer...');
  const client = new Client('rm:2181', 'rm-demo-command', {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });

  const producer = new HighLevelProducer(client);

  producer.on('ready', function() {
    const testObject = new Customer('Intelsat');

    // Create payload
    const payload = [{
      topic: 'rm-demo',
      messages: JSON.stringify(testObject),
      attributes: 1
    }];

    const interval = setInterval(function() {
      // Send payloadxx
      producer.send(payload, function(error, result) {
        console.log('Sent payload to Kafka: ', payload);
        if (error) {
          console.error(error);
        } else {
          console.log('formattedresult: ', result[KafkaGlobals.topicName][KafkaGlobals.topicPartition]);
        }
      });
    }, 5000);

  });

  producer.on('error', function(error) {
    console.error(error);
  });

  process.on('SIGINT', function () {
    console.log('Shutting down message producer...');
    producer.close(function () {
      process.exit();
    });
  });

  // For nodemon restarts..
  process.once('SIGUSR2', function () {
    producer.close(function () {
      console.log('Restarting message producer...');
      process.kill(process.pid, 'SIGUSR2');
    });
  });

}, 5000);
