"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = 'http://localhost';
exports.serverPort = 4500;
exports.graphqlPort = 4300;
exports.neo4jRMDemoDataName = 'RM-Demo';
exports.neo4jProductionRootModelName = 'productionRootModelId';
var Neo4jGlobals = (function () {
    function Neo4jGlobals() {
    }
    return Neo4jGlobals;
}());
Neo4jGlobals.rmDemoDataName = 'RM-Demo';
Neo4jGlobals.productionRootModelName = 'productionRootModelId';
Neo4jGlobals.requiredBranchNodeName = 'BranchAddedEvent';
exports.Neo4jGlobals = Neo4jGlobals;
var RmEventType;
(function (RmEventType) {
    RmEventType[RmEventType["RootModelAddedEvent"] = 0] = "RootModelAddedEvent";
    RmEventType[RmEventType["RootModelModifiedEvent"] = 1] = "RootModelModifiedEvent";
    RmEventType[RmEventType["RootModelRemovedEvent"] = 2] = "RootModelRemovedEvent";
    RmEventType[RmEventType["TransponderAddedEvent"] = 3] = "TransponderAddedEvent";
    RmEventType[RmEventType["TransponderModifiedEvent"] = 4] = "TransponderModifiedEvent";
    RmEventType[RmEventType["TransponderRemovedEvent"] = 5] = "TransponderRemovedEvent";
    RmEventType[RmEventType["CustomerAddedEvent"] = 6] = "CustomerAddedEvent";
    RmEventType[RmEventType["CustomerModifiedEvent"] = 7] = "CustomerModifiedEvent";
    RmEventType[RmEventType["CustomerRemovedEvent"] = 8] = "CustomerRemovedEvent";
    RmEventType[RmEventType["OriginatorAddedEvent"] = 9] = "OriginatorAddedEvent";
    RmEventType[RmEventType["OriginatorModifiedEvent"] = 10] = "OriginatorModifiedEvent";
    RmEventType[RmEventType["OriginatorRemovedEvent"] = 11] = "OriginatorRemovedEvent";
    RmEventType[RmEventType["AllocationAddedEvent"] = 12] = "AllocationAddedEvent";
    RmEventType[RmEventType["AllocationModifiedEvent"] = 13] = "AllocationModifiedEvent";
    RmEventType[RmEventType["AllocationRemovedEvent"] = 14] = "AllocationRemovedEvent";
})(RmEventType = exports.RmEventType || (exports.RmEventType = {}));
var DsGlobals = (function () {
    function DsGlobals() {
    }
    return DsGlobals;
}());
DsGlobals.serverURI = 'localhost:6020';
exports.DsGlobals = DsGlobals;
//# sourceMappingURL=app.globals.js.map