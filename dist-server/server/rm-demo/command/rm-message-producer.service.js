"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    RmMessageProducer.stopProducer = function () {
        this.producer.close(null);
    };
    RmMessageProducer.stopClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.client.close(function () {
                            resolve(null);
                        });
                    })];
            });
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
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
                            return __awaiter(this, void 0, void 0, function () {
                                var consumer_1, eventMsgOffset_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!error) return [3 /*break*/, 1];
                                            reject(error);
                                            return [3 /*break*/, 4];
                                        case 1:
                                            latestOffsetNum = data[app_globals_1.KafkaGlobals.topicName][app_globals_1.KafkaGlobals.topicPartition.toString()];
                                            if (!(startingOffsetNum < latestOffsetNum)) return [3 /*break*/, 2];
                                            consumer_1 = new kafka_node_1.Consumer(RmMessageProducer.client, topics, options);
                                            eventMsgOffset_1 = startingOffsetNum;
                                            consumer_1.on('message', function (message) {
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
                                                    if (eventMsgOffset_1 >= latestOffsetNum - 1) {
                                                        consumer_1.close(false, function () {
                                                        });
                                                        resolve(promiseOutput);
                                                    }
                                                    eventMsgOffset_1++;
                                                }
                                            });
                                            consumer_1.on('error', function (err) {
                                                reject(err);
                                            });
                                            return [3 /*break*/, 4];
                                        case 2: 
                                        // The start offset number was set to be greater than the latest offset
                                        // return right away
                                        return [4 /*yield*/, RmMessageProducer.stopClient()];
                                        case 3:
                                            // The start offset number was set to be greater than the latest offset
                                            // return right away
                                            _a.sent();
                                            resolve(promiseOutput);
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    })];
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