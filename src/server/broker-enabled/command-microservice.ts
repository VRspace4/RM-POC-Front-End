import {Client, HighLevelProducer} from "kafka-node";
import {Customer} from "../../app/es-demo/models/customer";

setTimeout(() => {
  const client = new Client('rm-backend:2181', 'rm-demo-command', {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });

  const producer = new HighLevelProducer(client);

  producer.on('ready', function() {
    // Test message
    const testObject = new Customer('Intelsat');
    const testString = JSON.stringify(testObject);
    // Create payload
    const payload = [{
      topic: 'rm-demo',
      messages: [testObject],
      attributes: 1
    }];

    const interval = setInterval(function() {
      // Send payload
      producer.send(payload, function(error, result) {
        console.log('Sent payload to Kafka: ', payload);
        if (error) {
          console.error(error);
        } else {
          const formattedResult = result[0];
          console.log('result: ', result);
        }
      });
    }, 2000);

  });

  producer.on('error', function(error) {
    console.error(error);
  });
}, 3000);
