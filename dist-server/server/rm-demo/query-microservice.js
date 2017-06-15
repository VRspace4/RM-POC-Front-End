"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
setTimeout(function () {
    console.log('Starting message consumer...');
    var client = new kafka_node_1.Client('rm:2181', 'rm-demo-test-client');
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
        console.log('Shutting down message consumer...');
        consumer.close(true, function () {
            process.exit();
        });
    });
    // For nodemonxxxbbb
    process.once('SIGUSR2', function () {
        consumer.close(false, function () {
            console.log('Restarting message consumer...');
            process.kill(process.pid, 'SIGUSR2');
        });
    });
    consumer.on('message', function (message) {
        console.log('object: ', message);
        console.log('message: ', JSON.parse(message.value));
        // const buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
        // const decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix
        // console.log('decoded: ', decodedMessage);
    });
    consumer.on('error', function (err) {
        console.log('error', err);
    });
}, 3000);
//# sourceMappingURL=query-microservice.js.map