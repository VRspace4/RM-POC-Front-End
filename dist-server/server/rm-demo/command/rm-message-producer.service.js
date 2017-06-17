"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var app_globals_1 = require("../../../app/app.globals");
var event_and_msg_offset_type_1 = require("../../../app/es-demo/types/event-and-msg-offset.type");
var return_with_response_message_type_1 = require("../../../app/es-demo/types/return-with-response-message.type");
var response_message_1 = require("../../../app/es-demo/types/response-message");
var RmMessageProducer = (function () {
    function RmMessageProducer() {
    }
    RmMessageProducer.createClient = function () {
        RmMessageProducer.client = new kafka_node_1.Client(app_globals_1.KafkaGlobals.uri, 'rm-demo-command', {
            sessionTimeout: 300,
            spinDelay: 100,
            retries: 2
        });
    };
    /**
     * Start the Kafka Producer server
     * @returns {Promise<void>}
     */
    RmMessageProducer.startProducerClient = function () {
        return new Promise(function (resolve, reject) {
            console.log('Starting message producer...');
            RmMessageProducer.producer = new kafka_node_1.HighLevelProducer(RmMessageProducer.client);
            RmMessageProducer.producer.on('ready', function () {
                console.log('Producer is ready...');
                resolve();
            });
            RmMessageProducer.producer.on('error', function (error) {
                console.error(error);
                reject(error);
            });
            process.on('SIGINT', function () {
                console.log('Shutting down message producer...');
                RmMessageProducer.producer.close(function () {
                    process.exit();
                });
            });
            // For nodemon restarts..
            process.once('SIGUSR2', function () {
                RmMessageProducer.producer.close(function () {
                    console.log('Restarting message producer...');
                    process.kill(process.pid, 'SIGUSR2');
                });
            });
        });
    };
    /**
     * Get all events from the broker starting at the given input parameter
     * @param startingOffsetNum
     * @returns {Promise<Array<EventAndMsgOffset>>}
     */
    RmMessageProducer.fetchEventsFromOffset = function (startingOffsetNum) {
        return new Promise(function (resolve, reject) {
            var promiseOutput = [];
            var topics = [{
                    topic: app_globals_1.KafkaGlobals.topicName,
                    offset: startingOffsetNum,
                    autoCommit: false
                }];
            var options = {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: 'utf8',
                fromOffset: true
            };
            // Fetch the latest offset so we know when to stop
            RmMessageProducer.createClient();
            var offset = new kafka_node_1.Offset(RmMessageProducer.client);
            var latestOffsetNum;
            offset.fetchLatestOffsets([app_globals_1.KafkaGlobals.topicName], function (error, data) {
                if (error) {
                    reject(error);
                }
                else {
                    latestOffsetNum = data[app_globals_1.KafkaGlobals.topicName][app_globals_1.KafkaGlobals.topicPartition.toString()];
                }
            });
            // Begin retrieving all the events
            var consumer = new kafka_node_1.Consumer(RmMessageProducer.client, topics, options);
            var eventMsgOffset = startingOffsetNum;
            consumer.on('message', function (message) {
                var event;
                try {
                    event = JSON.parse(message.value);
                }
                catch (e) {
                    // Ignore error
                    return;
                }
                finally {
                    if (typeof event !== "undefined") {
                        var msgOffset = parseInt(message.offset, 10);
                        promiseOutput.push(new event_and_msg_offset_type_1.EventAndMsgOffset(event, msgOffset));
                    }
                    if (eventMsgOffset >= latestOffsetNum - 1) {
                        consumer.close(false, function () {
                        });
                        resolve(promiseOutput);
                    }
                    eventMsgOffset++;
                }
            });
            consumer.on('error', function (err) {
                reject(err);
            });
        });
    };
    RmMessageProducer.serializeEvent = function (event) {
        var cloneEvent = JSON.parse(JSON.stringify(event));
        delete cloneEvent.rootModel;
        return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
    };
    RmMessageProducer.commitEvents = function (events) {
        var jsonString = [];
        events.forEach(function (event) {
            jsonString.push(JSON.stringify(event));
        });
        // Create payload
        var payload = [{
                topic: app_globals_1.KafkaGlobals.topicName,
                partition: parseInt(app_globals_1.KafkaGlobals.topicPartition, 10),
                messages: jsonString,
                attributes: 1
            }];
        return new Promise(function (resolve, reject) {
            RmMessageProducer.producer.send(payload, function (error, result) {
                var output = new return_with_response_message_type_1.ReturnWithResponseMsg();
                var resultVerify = new response_message_1.ResponseMessage();
                var resultMsgOffset = -1;
                console.log('Sent payload to broker: ', payload);
                if (error) {
                    resultVerify.type = response_message_1.ResponseMessageType[response_message_1.ResponseMessageType.error];
                    resultVerify.title = "Error while committing";
                    resultVerify.message = "Unable to commit message to broker: " + error;
                }
                else {
                    resultVerify.type = response_message_1.ResponseMessageType[response_message_1.ResponseMessageType.success];
                    resultVerify.title = 'Commit successful';
                    resultVerify.message = "The event(s) have been committed successfully!";
                    resultMsgOffset = result[app_globals_1.KafkaGlobals.topicName][app_globals_1.KafkaGlobals.topicPartition];
                }
                output.responseMessage = resultVerify;
                output.output = resultMsgOffset;
                resolve(output);
            });
        });
    };
    ;
    return RmMessageProducer;
}());
exports.RmMessageProducer = RmMessageProducer;
//# sourceMappingURL=rm-message-producer.service.js.map