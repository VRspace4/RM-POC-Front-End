"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var app_globals_1 = require("../../../app/app.globals");
var RmMessageOffset = (function () {
    function RmMessageOffset() {
    }
    RmMessageOffset.testOffset = function () {
        var client = new kafka_node_1.Client(app_globals_1.KafkaGlobals.uri, 'rm-demo-test-client-test-1');
        var offset = new kafka_node_1.Offset(client);
        var payload = [{
                topic: app_globals_1.KafkaGlobals.topicName
            }];
        offset.fetchLatestOffsets(['rm-demo'], function (error, data) {
            console.log(data);
        });
    };
    RmMessageOffset.startServer = function () {
        setTimeout(function () {
            console.log("Starting message consumer on topic, " + app_globals_1.KafkaGlobals.topicName + "...");
            var client = new kafka_node_1.Client(app_globals_1.KafkaGlobals.uri, 'rm-demo-test-client-test-1');
            var topics = [{
                    topic: app_globals_1.KafkaGlobals.topicName,
                    offset: 0
                }];
            var options = {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: 'utf8'
            };
            var consumer = new kafka_node_1.Consumer(client, topics, options);
            // consumer.setOffset(KafkaGlobals.topicName, 0, 0);
            consumer.on('message', function (message) {
                console.log('object: ', message);
                console.log('message: ', JSON.parse(message.value));
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
    return RmMessageOffset;
}());
exports.RmMessageOffset = RmMessageOffset;
//# sourceMappingURL=rm-message-offset.service.js.map