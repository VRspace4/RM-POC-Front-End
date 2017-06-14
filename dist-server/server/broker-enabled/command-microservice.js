"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var customer_1 = require("../../app/es-demo/models/customer");
setTimeout(function () {
    var client = new kafka_node_1.Client('rm-backend:2181', 'rm-demo-command', {
        sessionTimeout: 300,
        spinDelay: 100,
        retries: 2
    });
    var producer = new kafka_node_1.HighLevelProducer(client);
    producer.on('ready', function () {
        // Test message
        var testObject = new customer_1.Customer('Intelsat');
        var testString = JSON.stringify(testObject);
        // Create payload
        var payload = [{
                topic: 'rm-demo',
                messages: [testObject],
                attributes: 1
            }];
        var interval = setInterval(function () {
            // Send payload
            producer.send(payload, function (error, result) {
                console.log('Sent payload to Kafka: ', payload);
                if (error) {
                    console.error(error);
                }
                else {
                    var formattedResult = result[0];
                    console.log('result: ', result);
                }
            });
        }, 2000);
    });
    producer.on('error', function (error) {
        console.error(error);
    });
}, 3000);
//# sourceMappingURL=command-microservice.js.map