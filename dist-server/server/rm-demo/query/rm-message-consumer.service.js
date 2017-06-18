"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var app_globals_1 = require("../../../app/app.globals");
var verification_output_1 = require("../../../app/es-demo/types/verification-output");
var root_model_added_event_1 = require("../../../app/es-demo/events/root-model-added-event");
var rm_command_controller_service_1 = require("../command/rm-command-controller.service");
var RmMessageConsumer = (function () {
    function RmMessageConsumer() {
    }
    RmMessageConsumer.startConsumingEvents = function (rootModel, startFromOffset, onMessageCallback) {
        console.log('Starting message consumer...');
        var client = new kafka_node_1.Client(app_globals_1.KafkaGlobals.uri, 'rm-demo-query');
        var topics = [{
                topic: app_globals_1.KafkaGlobals.topicName,
                offset: startFromOffset
            }];
        var options = {
            autoCommit: false,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: true
        };
        var consumer = new kafka_node_1.Consumer(client, topics, options);
        consumer.on('message', onMessageCallback);
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
    };
    RmMessageConsumer.processRawEventToRootModel = function (rawEvent, rootModel) {
        var processingResult = new verification_output_1.VerificationOutput();
        var jsonEvent;
        try {
            jsonEvent = JSON.parse(rawEvent);
        }
        catch (e) {
            processingResult.passed = false;
            processingResult.failedMessage = 'Invalid JSON string';
        }
        if (jsonEvent) {
            var deserializationResult = rm_command_controller_service_1.RmCommandController.deserializeEvent(jsonEvent, rootModel);
            if (deserializationResult.verificationResult.passed) {
                if (deserializationResult.output instanceof root_model_added_event_1.RootModelAddedEvent) {
                    for (var keyName in deserializationResult.output.rootModel) {
                        if (rootModel.hasOwnProperty(keyName)) {
                            rootModel[keyName] = deserializationResult.output.rootModel[keyName];
                        }
                    }
                }
                else if (rootModel.name !== '') {
                    deserializationResult.output.rootModel = rootModel;
                    try {
                        deserializationResult.output.process();
                    }
                    catch (e) {
                        console.error('Skipping the following event: ', deserializationResult.output.name);
                        // console.error(e);
                    }
                }
            }
            else {
                processingResult.passed = false;
                processingResult.failedMessage = "Unable to apply the raw event into the root model, " + rawEvent + "."
                    + (" " + deserializationResult.verificationResult.failedMessage);
            }
        }
        return processingResult;
    };
    return RmMessageConsumer;
}());
exports.RmMessageConsumer = RmMessageConsumer;
//# sourceMappingURL=rm-message-consumer.service.js.map