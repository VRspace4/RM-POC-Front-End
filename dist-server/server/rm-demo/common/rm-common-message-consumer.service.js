"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var app_globals_1 = require("../../../app/app.globals");
var RmMessageConsumer = (function () {
    function RmMessageConsumer() {
    }
    RmMessageConsumer.startServer = function () {
        setTimeout(function () {
            console.log("Starting message consumer on topic, " + app_globals_1.KafkaGlobals.topicName + "...");
            var client = new kafka_node_1.Client(app_globals_1.KafkaGlobals.uri, 'rm-demo-test-client-test-1');
            var topics = [{
                    topic: app_globals_1.KafkaGlobals.topicName,
                    offset: 0,
                    autoCommit: false
                }];
            var options = {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: 'utf8',
                fromOffset: true
            };
            var consumer = new kafka_node_1.Consumer(client, topics, options);
            consumer.on('message', function (message) {
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
    };
    return RmMessageConsumer;
}());
exports.RmMessageConsumer = RmMessageConsumer;
//# sourceMappingURL=rm-common-message-consumer.service.js.map