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
var neo4j_driver_1 = require("neo4j-driver");
var app_globals_1 = require("../../../app/app.globals");
var rm_command_controller_service_1 = require("./rm-command-controller.service");
var root_model_added_event_1 = require("../../../app/es-demo/events/root-model-added-event");
var key_value_1 = require("../../../app/es-demo/types/key-value");
var uri = 'bolt://rm';
var RmCommandRepository = (function () {
    function RmCommandRepository() {
    }
    RmCommandRepository.getDataNode = function (dataNodeName) {
        var command = "MATCH (dataNode:Data {name: '" + dataNodeName + "'}) RETURN dataNode";
        return new Promise(function (resolve, reject) {
            RmCommandRepository._session.run(command).then(function (result) {
                var keys = [];
                var values = [];
                if (result.records.length > 0) {
                    var resultObj = result.records[0].get(0).properties;
                    for (var key in resultObj) {
                        if (resultObj.hasOwnProperty(key)) {
                            keys.push(key);
                            values.push(resultObj[key]);
                        }
                        ;
                    }
                    ;
                }
                var keyValue = new key_value_1.KeyValue(keys, values);
                resolve(keyValue);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    RmCommandRepository.setDataNode = function (dataNodeName, key, value) {
        var command = "MERGE (n:Data {name: '" + app_globals_1.Neo4jGlobals.rmDemoDataName + "'}) \n                      SET n." + key + " = '" + value + "'\n                      RETURN n";
        return RmCommandRepository._session.run(command);
    };
    /**
     * Gets the production path of all events and not any of the branch paths.
     * Requires that there exist the property 'productionRootModelId' in the RM-Demo
     * Data node.
     */
    RmCommandRepository.getProductionEventChain = function () {
        var command = "MATCH (rmData:Data{name: '" + app_globals_1.Neo4jGlobals.rmDemoDataName + "'}),\n        p=(:Event { name:'RootModelAddedEvent', rootModelId: rmData." + app_globals_1.Neo4jGlobals.productionRootModelName + " })-[:APPEND*]->(:Event), \n        (without:Event { name:'BranchAddedEvent' })\n        WHERE NONE (x IN nodes(p) WHERE x=without)RETURN p";
        return new Promise(function (resolve, reject) {
            RmCommandRepository._session.run(command).then(function (result) {
                var rootModel;
                var events = [];
                if (result.records.length > 0) {
                    // Deserialize root event
                    var deserializationResult = rm_command_controller_service_1.RmCommandController.deserializeEvent(result.records[0].get(0).start.properties, rootModel);
                    var rootEvent = deserializationResult.output;
                    if (rootEvent instanceof root_model_added_event_1.RootModelAddedEvent) {
                        rootModel = rootEvent.rootModel;
                        events.push(rootEvent);
                        var fieldLength = 0;
                        for (var _i = 0, _a = result.records; _i < _a.length; _i++) {
                            var record = _a[_i];
                            if (fieldLength < record.get(0).length) {
                                fieldLength++;
                                var deserializeResult = rm_command_controller_service_1.RmCommandController.deserializeEvent(record.get(0).end.properties, rootModel);
                                var event_1 = deserializeResult.output;
                                event_1.rootModel = rootModel;
                                events.push(event_1);
                            }
                            else {
                                break;
                            }
                        }
                        resolve(events);
                    }
                    else {
                        reject(new Error('The first event in the chain is NOT RootModelAddedEvent!'));
                    }
                    ;
                }
                else {
                    reject(new Error('Expected to receive at least one event but got none instead!'));
                }
                ;
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    RmCommandRepository.ensureNodeExist = function (eventName) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                command = "MERGE (n:Event {name: '" + eventName + "'}) RETURN n";
                return [2 /*return*/, this._session.run(command)];
            });
        });
    };
    RmCommandRepository.getProductionRootModelId = function () {
        var _this = this;
        var command = "MATCH (n:Data) WHERE n.name = '" + app_globals_1.Neo4jGlobals.rmDemoDataName + "' RETURN n." + app_globals_1.Neo4jGlobals.productionRootModelName;
        return new Promise(function (resolve, reject) {
            _this._session.run(command).then(function (result) {
                var rootModelId = result.records[0].get(0);
                resolve(rootModelId);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    RmCommandRepository.getChainOfEvents = function (eventId) {
        var _this = this;
        var command = "MATCH (x:Event)-[:APPEND*0..]->(e:Event) where ID(e) = " + eventId + " RETURN x order by id(x)";
        return new Promise(function (resolve, reject) {
            _this._session.run(command).then(function (result) {
                var rootModel;
                var events = result.records.map(function (record) {
                    var deserializResult = rm_command_controller_service_1.RmCommandController.deserializeEvent(record.get(0).properties, rootModel);
                    var event = deserializResult.output;
                    rootModel = event.rootModel;
                    return event;
                });
                resolve(events);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    RmCommandRepository.serializeEvent = function (event) {
        var cloneEvent = JSON.parse(JSON.stringify(event));
        delete cloneEvent.rootModel;
        return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
    };
    RmCommandRepository.appendToEventChain = function (event, parentId) {
        var serializedEvent = this.serializeEvent(event);
        var command = "MATCH (parent:Event) where ID(parent) = " + parentId + " \n      CREATE (parent)-[r:APPEND {parentId: " + parentId + "}]->(e:Event " + serializedEvent + ") RETURN e";
        return this._session.run(command);
    };
    RmCommandRepository.createNewRootModelEvent = function (newRootModelAddedEvent) {
        var serializedEvent = this.serializeEvent(newRootModelAddedEvent);
        var command = "CREATE (e:Event " + serializedEvent + ") RETURN e";
        return this._session.run(command);
    };
    RmCommandRepository.getNodeIdFromCmdOutput = function (cmdOutput) {
        if (cmdOutput === null) {
            throw new Error('The input neo4j command output should not be empty!');
        }
        return parseInt(cmdOutput.records[0].get(0).identity.low, 10);
    };
    return RmCommandRepository;
}());
RmCommandRepository._session = neo4j_driver_1.v1.driver(uri, neo4j_driver_1.v1.auth.basic('neo4j', 'Resman1989#')).session();
exports.RmCommandRepository = RmCommandRepository;
//# sourceMappingURL=rm-command-repository.service.js.map