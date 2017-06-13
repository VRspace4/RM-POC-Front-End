"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var neo4j_driver_1 = require("neo4j-driver");
var app_globals_1 = require("../../../app/app.globals");
var rm_common_controller_service_1 = require("../rm-common-controller.service");
var root_model_added_event_1 = require("../../../app/es-demo/events/root-model-added-event");
var uri = 'bolt://localhost';
var RmCommandRepository = (function () {
    function RmCommandRepository() {
    }
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
                    var rootEvent = rm_common_controller_service_1.RmCommonController.deserializeEvent(result.records[0].get(0).start.properties, rootModel);
                    if (rootEvent instanceof root_model_added_event_1.RootModelAddedEvent) {
                        rootModel = rootEvent.rootModel;
                        events.push(rootEvent);
                        var fieldLength = 0;
                        for (var _i = 0, _a = result.records; _i < _a.length; _i++) {
                            var record = _a[_i];
                            if (fieldLength < record.get(0).length) {
                                fieldLength++;
                                var event_1 = rm_common_controller_service_1.RmCommonController.deserializeEvent(record.get(0).end.properties, rootModel);
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
        var command = "MERGE (n:Event {name: '" + eventName + "'}) RETURN n";
        return this._session.run(command);
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
                    var event = rm_common_controller_service_1.RmCommonController.deserializeEvent(record.get(0).properties, rootModel);
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
RmCommandRepository._session = neo4j_driver_1.v1.driver(uri, neo4j_driver_1.v1.auth.basic('neo4j', '9colada')).session();
exports.RmCommandRepository = RmCommandRepository;
//# sourceMappingURL=rm-command-repository.service.js.map