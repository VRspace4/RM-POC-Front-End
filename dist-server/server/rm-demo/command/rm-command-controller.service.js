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
var rm_command_repository_service_1 = require("./rm-command-repository.service");
var root_model_added_event_1 = require("../../../app/es-demo/events/root-model-added-event");
var app_globals_1 = require("../../../app/app.globals");
var transponder_added_event_1 = require("../../../app/es-demo/events/transponder-added-event");
var verification_output_1 = require("../../../app/es-demo/types/verification-output");
var return_with_verifcation_1 = require("../../../app/es-demo/types/return-with-verifcation");
var allocation_removed_event_1 = require("../../../app/es-demo/events/allocation-removed-event");
var allocation_modified_event_1 = require("../../../app/es-demo/events/allocation-modified-event");
var allocation_added_event_1 = require("../../../app/es-demo/events/allocation-added-event");
var originator_removed_event_1 = require("../../../app/es-demo/events/originator-removed-event");
var originator_modified_event_1 = require("../../../app/es-demo/events/originator-modified-event");
var originator_added_event_1 = require("../../../app/es-demo/events/originator-added-event");
var customer_modified_event_1 = require("../../../app/es-demo/events/customer-modified-event");
var customer_added_event_1 = require("../../../app/es-demo/events/customer-added-event");
var transponder_removed_event_1 = require("../../../app/es-demo/events/transponder-removed-event");
var transponder_modified_event_1 = require("../../../app/es-demo/events/transponder-modified-event");
var root_model_modified_event_1 = require("../../../app/es-demo/events/root-model-modified-event");
var response_message_1 = require("../../../app/es-demo/types/response-message");
var rm_message_producer_service_1 = require("./rm-message-producer.service");
var app_helpers_1 = require("../../../app/app.helpers");
var RmCommandController = (function () {
    function RmCommandController() {
    }
    /**
     * Does the following verification:
     * 1. Makes sure the event name is valid
     * 2. Makes sure the keys of the events are valid and matches the type it claims to be
     * @param events
     * @returns {ResponseMessage}
     */
    RmCommandController.verifyEventsFormatting = function (events) {
        var deserializationResults = [];
        var outputResponse = new response_message_1.ResponseMessage();
        var outputVerification = new verification_output_1.VerificationOutput();
        if (events.length > 0) {
            for (var i = 0; i < events.length; i++) {
                var result = this.deserializeEvent(events[i], null);
                deserializationResults.push(result.verificationResult);
            }
        }
        else {
            var result = new verification_output_1.VerificationOutput(false, "Must pass at least one event!");
            deserializationResults.push(result);
        }
        var allPassed = true;
        var failOutputString = [];
        for (var i = 0; i < deserializationResults.length; i++) {
            if (deserializationResults[i].passed === false) {
                allPassed = false;
                failOutputString.push(deserializationResults[i].failedMessage);
            }
        }
        if (allPassed) {
            var eventList_1 = [];
            events.forEach(function (event) {
                eventList_1.push(event.name);
            });
            outputVerification.passed = true;
            outputResponse.type = response_message_1.ResponseMessageType[response_message_1.ResponseMessageType.success];
            outputResponse.title = "Events committed";
            outputResponse.message = "The event(s) (" + eventList_1 + ") have been committed.";
        }
        else {
            outputVerification.passed = false;
            outputVerification.failedMessage = 'See ResponseMessage object';
            outputResponse.type = response_message_1.ResponseMessageType[response_message_1.ResponseMessageType.error];
            outputResponse.title = "Failed to process";
            outputResponse.message = "Failed to process the following event(s). " + failOutputString;
        }
        return new return_with_verifcation_1.ReturnWithVerification(outputVerification, outputResponse);
    };
    RmCommandController.deserializeEvent = function (event, rootModel) {
        var result = new verification_output_1.VerificationOutput();
        var convertedEvent;
        switch (event.name) {
            case 'RootModelAddedEvent':
                var rootModelAddedEvent = event;
                convertedEvent = new root_model_added_event_1.RootModelAddedEvent(rootModel, rootModelAddedEvent.rootModelName, app_helpers_1.generateUUID(), rootModelAddedEvent.transponders, rootModelAddedEvent.customers, rootModelAddedEvent.originators);
                break;
            case 'RootModelModifiedEvent':
                var rootModelModifiedEvent = event;
                convertedEvent = new root_model_modified_event_1.RootModelModifiedEvent(rootModel, rootModelModifiedEvent.keys, rootModelModifiedEvent.values);
                break;
            case 'TransponderAddedEvent':
                var transponderAddedEvent = event;
                convertedEvent = new transponder_added_event_1.TransponderAddedEvent(rootModel, transponderAddedEvent.transponderName);
                break;
            case 'TransponderModifiedEvent':
                var transponderModifiedEvent = event;
                convertedEvent = new transponder_modified_event_1.TransponderModifiedEvent(rootModel, transponderModifiedEvent.transponderId, transponderModifiedEvent.keys, transponderModifiedEvent.values);
                break;
            case 'TransponderRemovedEvent':
                var transponderRemovedEvent = event;
                convertedEvent = new transponder_removed_event_1.TransponderRemovedEvent(rootModel, transponderRemovedEvent.transponderId);
                break;
            case 'CustomerAddedEvent':
                var customerAddedEvent = event;
                convertedEvent = new customer_added_event_1.CustomerAddedEvent(rootModel, customerAddedEvent.customerName);
                break;
            case 'CustomerModifiedEvent':
                var customerModifiedEvent = event;
                convertedEvent = new customer_modified_event_1.CustomerModifiedEvent(rootModel, customerModifiedEvent.customerId, customerModifiedEvent.keys, customerModifiedEvent.values);
                break;
            case 'CustomerRemovedEvent':
                convertedEvent = event;
                break;
            case 'OriginatorAddedEvent':
                var originatorAddedEvent = event;
                convertedEvent = new originator_added_event_1.OriginatorAddedEvent(rootModel, originatorAddedEvent.originatorName);
                break;
            case 'OriginatorModifiedEvent':
                var originatorModifiedEvent = event;
                convertedEvent = new originator_modified_event_1.OriginatorModifiedEvent(rootModel, originatorModifiedEvent.originatorId, originatorModifiedEvent.keys, originatorModifiedEvent.values);
                break;
            case 'OriginatorRemovedEvent':
                var originatorRemovedEvent = event;
                convertedEvent = new originator_removed_event_1.OriginatorRemovedEvent(rootModel, originatorRemovedEvent.originatorId);
                break;
            case 'AllocationAddedEvent':
                var allocationAddedEvent = event;
                convertedEvent = new allocation_added_event_1.AllocationAddedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.startFrequency, allocationAddedEvent.stopFrequency, allocationAddedEvent.powerUsage, allocationAddedEvent.customerId, allocationAddedEvent.originatorId, allocationAddedEvent.allocationName);
                break;
            case 'AllocationModifiedEvent':
                var allocationModifiedEvent = event;
                convertedEvent = new allocation_modified_event_1.AllocationModifiedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.allocationId, allocationModifiedEvent.keys, allocationModifiedEvent.values);
                break;
            case 'AllocationRemovedEvent':
                var allocationRemovedEvent = event;
                convertedEvent = new allocation_removed_event_1.AllocationRemovedEvent(rootModel, allocationRemovedEvent.transponderId, allocationRemovedEvent.allocationId);
                break;
            default:
                result.passed = false;
                result.failedMessage = 'The event is invalid - [' + JSON.stringify(event) + ']!';
        }
        if (result.passed === true) {
            result = RmCommandController.verifyEventObject(event, convertedEvent);
        }
        var output = new return_with_verifcation_1.ReturnWithVerification(result, convertedEvent);
        return output;
    };
    RmCommandController.verifyEventObject = function (eventObject, eventActual) {
        var result = new verification_output_1.VerificationOutput();
        for (var keyName in eventObject) {
            if (eventActual.hasOwnProperty(keyName) === false) {
                result.passed = false;
                result.failedMessage = "The key, " + keyName + ", from the event is invalid!";
                break;
            }
        }
        return result;
    };
    /**
     * 1. Attempt to retrieve the latest instance of root model from message broker
     * 2. If no instance, then produce the proper events to start the root model
     *    and create a new transponder. Then process the events to return the root model
     * 3. If an instance exist, process the event and return the root model
     */
    RmCommandController.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return __awaiter(this, void 0, void 0, function () {
                            var eventChainAndOffset, rootModelEventIndex, rootModelEventOffset, i, rootModelAddedEvent, transponderAddedEvent, eventsToBeProcessed, i, result, rootModel;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, rm_message_producer_service_1.RmMessageProducer.fetchEventsFromOffset(23)];
                                    case 1:
                                        eventChainAndOffset = _a.sent();
                                        rm_message_producer_service_1.RmMessageProducer.createClient();
                                        return [4 /*yield*/, rm_message_producer_service_1.RmMessageProducer.startProducerClient()];
                                    case 2:
                                        _a.sent();
                                        rootModelEventIndex = -1;
                                        rootModelEventOffset = -1;
                                        for (i = eventChainAndOffset.length - 1; i >= 0; i--) {
                                            if (eventChainAndOffset[i].event.name === app_globals_1.RmEventType[app_globals_1.RmEventType.RootModelAddedEvent]) {
                                                rootModelEventIndex = i;
                                                rootModelEventOffset = eventChainAndOffset[i].msgOffset;
                                                break;
                                            }
                                        }
                                        // Generate the starting sequence of events to create a new root model
                                        if (rootModelEventIndex === -1) {
                                            rootModelAddedEvent = new root_model_added_event_1.RootModelAddedEvent(null, 'Production');
                                            transponderAddedEvent = new transponder_added_event_1.TransponderAddedEvent(null, 'Transponder 1');
                                            rm_message_producer_service_1.RmMessageProducer.commitEvents([rootModelAddedEvent, transponderAddedEvent])
                                                .then(function (result) {
                                                console.log(result);
                                            });
                                        }
                                        else {
                                            eventsToBeProcessed = [];
                                            for (i = rootModelEventIndex; i < eventChainAndOffset.length; i++) {
                                                result = RmCommandController.deserializeEvent(eventChainAndOffset[i].event, null);
                                                if (result.verificationResult.passed) {
                                                    eventsToBeProcessed.push(result.output);
                                                }
                                                else {
                                                    reject(result.verificationResult.failedMessage);
                                                }
                                            }
                                            rootModel = RmCommandController.processEventsToRootModel(eventsToBeProcessed);
                                            resolve(rootModel);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })];
            });
        });
    };
    /**
     * Prepares the graph database and create a production event path if
     * it doesn't already exist. Then return the latest root model.
     * @returns {Promise<EsEvent[]>} the array of events from the production path
     */
    RmCommandController.initializeTemp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rootModel, nodeRecord, dataKeyValue, productionRootModelIdIndex, date, currentDate, rootModelAddedEvent, transponderAddedEvent, productionEventChain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rm_command_repository_service_1.RmCommandRepository.ensureNodeExist(app_globals_1.Neo4jGlobals.requiredBranchNodeName)];
                    case 1:
                        nodeRecord = _a.sent();
                        if (nodeRecord.records.length <= 0) {
                            console.error(new Error('Fail to ensure there is at least one BranchAddedEvent node in neo4j database!'));
                        }
                        return [4 /*yield*/, rm_command_repository_service_1.RmCommandRepository.getDataNode(app_globals_1.Neo4jGlobals.rmDemoDataName)];
                    case 2:
                        dataKeyValue = _a.sent();
                        productionRootModelIdIndex = dataKeyValue.key.includes(app_globals_1.Neo4jGlobals.productionRootModelName);
                        if (!(productionRootModelIdIndex === false)) return [3 /*break*/, 3];
                        date = new Date();
                        currentDate = '(' + date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() + ')';
                        rootModelAddedEvent = new root_model_added_event_1.RootModelAddedEvent(null, 'Production ' + currentDate);
                        transponderAddedEvent = new transponder_added_event_1.TransponderAddedEvent(null, 'Transponder ' + currentDate);
                        // *** latest root model is already set from within this function
                        RmCommandController.insertEvents([rootModelAddedEvent, transponderAddedEvent], null, function (rootModelOutput) {
                            rootModel = rootModelOutput;
                            // 2b. Insert into database data node
                            rm_command_repository_service_1.RmCommandRepository.setDataNode(app_globals_1.Neo4jGlobals.rmDemoDataName, app_globals_1.Neo4jGlobals.productionRootModelName, rootModel.id);
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, rm_command_repository_service_1.RmCommandRepository.getProductionEventChain()];
                    case 4:
                        productionEventChain = _a.sent();
                        rootModel = this.processEventsToRootModel(productionEventChain);
                        _a.label = 5;
                    case 5: return [2 /*return*/, rootModel];
                }
            });
        });
    };
    RmCommandController.processEventsToRootModel = function (eventChain) {
        var rootModel = null;
        eventChain.forEach(function (event) {
            if (event instanceof root_model_added_event_1.RootModelAddedEvent) {
                rootModel = event.process();
            }
            else {
                event.rootModel = rootModel;
                event.process();
            }
        });
        return rootModel;
    };
    /**
     * First make sure the event processing of the root model is valid.
     * Then insert the event, either new root model event or any other, and then returns
     * the root model object through a callback
     * @param eventObjects
     * @param parentId
     * @param resultCallback
     */
    RmCommandController.insertEvents = function (eventObjects, parentId, resultCallback) {
        var _this = this;
        if (eventObjects.length > 0) {
            var result = this.deserializeEvent(eventObjects.shift(), null);
            this._lastEvent = result.output;
            // Commit that event into the database
            this.processEvent(this._lastEvent, parentId)
                .then(function (eventId) {
                // Commit successfully finished
                _this._lastEventId = eventId;
                // Take the rootModel only if from RootModelAddedEvent, otherwise
                // apply the rootModel to the event.
                if (_this._lastEvent instanceof root_model_added_event_1.RootModelAddedEvent) {
                    _this._rootModel = _this._lastEvent.rootModel;
                }
                else {
                    _this._lastEvent.rootModel = _this._rootModel;
                }
                _this._lastEvent.process();
                // Continue to the next event
                _this.insertEvents(eventObjects, eventId, resultCallback);
            });
        }
        else {
            resultCallback(this._rootModel);
        }
    };
    RmCommandController.processEvent = function (event, parentId) {
        var promise;
        if (parentId) {
            promise = rm_command_repository_service_1.RmCommandRepository.appendToEventChain(event, parentId);
        }
        else {
            promise = rm_command_repository_service_1.RmCommandRepository.createNewRootModelEvent(event);
        }
        return new Promise(function (resolve, reject) {
            promise.then(function (result) {
                var eventId = result.records[0].get(0).identity.low;
                resolve(eventId);
            });
        });
    };
    RmCommandController.getRootModelFromEventId = function (eventId) {
        return new Promise(function (resolve, reject) {
            rm_command_repository_service_1.RmCommandRepository.getChainOfEvents(eventId).then(function (events) {
                events.forEach(function (event) {
                    return event.process();
                });
                // apply this root model to the class level root model
                var rootModel = events[0].rootModel;
                rootModel.eventId = eventId;
                resolve(rootModel);
            });
        });
    };
    return RmCommandController;
}());
exports.RmCommandController = RmCommandController;
//# sourceMappingURL=rm-command-controller.service.js.map