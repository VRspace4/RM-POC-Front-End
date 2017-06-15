"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var customer_1 = require("../../app/es-demo/models/customer");
var avro = require("avsc");
var avroSchema = {
    name: 'MyAwesomeType',
    type: 'record',
    fields: [
        {
            name: 'id',
            type: 'string'
        }, {
            name: 'timestamp',
            type: 'double'
        }, {
            name: 'enumField',
            type: {
                name: 'EnumField',
                type: 'enum',
                symbols: ['sym1', 'sym2', 'sym3']
            }
        }
    ]
};
var type = avro.parse(avroSchema);
setTimeout(function () {
    var client = new kafka_node_1.Client('rm-backend:2181', 'rm-demo-command', {
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
                    var formattedResult = result[0];
                    console.log('result: ', result);
                }
            });
        }, 5000);
    });
    producer.on('error', function (error) {
        console.error(error);
    });
    // For nodemon restarts
    process.once('SIGUSR2', function () {
        producer.close(function () {
            console.log('closing from nodemon...');
        });
    });
}, 3000);
//# sourceMappingURL=command-microservice.js.map