"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
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
        encoding: 'buffer'
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
        console.log('closing from nodemon...');
        consumer.close(true, function () {
            process.exit();
        });
    });
    consumer.on('message', function (message) {
        console.log('message: ', message.value);
        // const buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
        // const decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix
        // console.log('decoded: ', decodedMessage);
    });
    consumer.on('error', function (err) {
        console.log('error', err);
    });
}, 8000);
console.log('Runing 12');
//# sourceMappingURL=query-microservice.js.map