"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var avro = require("avsc");
var typeDescription = {
    name: 'MyAwesomeType',
    type: 'record',
    fields: [{
            name: 'enumField',
            type: {
                name: 'EnumField',
                type: 'enum',
                symbols: ['sym1', 'sym2', 'sym3']
            }
        }, {
            name: 'id',
            type: 'string'
        }, {
            name: 'timestamp',
            type: 'double'
        }]
};
var type = avro.parse(typeDescription);
setTimeout(function () {
    console.log('starting nowxx');
    var client = new kafka_node_1.Client('rm-backend:2181', 'rm-demo-test-client');
    var topics = [{
            topic: 'rm-demo'
        }];
    var options = {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8'
    };
    var consumer = new kafka_node_1.HighLevelConsumer(client, topics, options);
    process.on('SIGINT', function () {
        console.log('closing....mm');
        consumer.close(true, function () {
            process.exit();
        });
    });
    // For nodemon restarts
    process.once('SIGUSR2', function () {
        consumer.close(true, function () {
            console.log('closing from nodemon...');
        });
    });
    consumer.on('message', function (message) {
        console.log('message: ', JSON.parse(message.value));
        // const buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
        // const decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix
        // console.log('decoded: ', decodedMessage);
    });
    consumer.on('error', function (err) {
        console.log('error', err);
    });
}, 3000);
console.log('Runing 17');
//# sourceMappingURL=query-microservice.js.map