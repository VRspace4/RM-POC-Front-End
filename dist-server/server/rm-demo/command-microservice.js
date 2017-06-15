"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var customer_1 = require("../../app/es-demo/models/customer");
var app_globals_1 = require("../../app/app.globals");
// Kafka producer
setTimeout(function () {
    console.log('Starting message producer...');
    var client = new kafka_node_1.Client('rm:2181', 'rm-demo-command', {
        sessionTimeout: 300,
        spinDelay: 100,
        retries: 2
    });
    var producer = new kafka_node_1.HighLevelProducer(client);
    producer.on('ready', function () {
        var testObject = new customer_1.Customer('Intelsat');
        // Create payload
        var payload = [{
                topic: 'rm-demo',
                messages: JSON.stringify(testObject),
                attributes: 1
            }];
        var interval = setInterval(function () {
            // Send payloadxx
            producer.send(payload, function (error, result) {
                console.log('Sent payload to Kafka: ', payload);
                if (error) {
                    console.error(error);
                }
                else {
                    console.log('formattedresult: ', result[app_globals_1.KafkaGlobals.topicName][app_globals_1.KafkaGlobals.topicPartition]);
                }
            });
        }, 5000);
    });
    producer.on('error', function (error) {
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
//# sourceMappingURL=command-microservice.js.map