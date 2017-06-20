"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var GeneralGlobals = (function () {
    function GeneralGlobals() {
    }
    return GeneralGlobals;
}());
GeneralGlobals.serverHostname = process.env.RM_HOSTNAME || 'http://localhost';
GeneralGlobals.commandRestPort = process.env.RM_CMD_REST_PORT || 4500;
GeneralGlobals.queryRestPort = process.env.RM_QUERY_REST_PORT || 4600;
GeneralGlobals.graphQLPort = process.env.RM_GRAPHQL_PORT || 4000;
GeneralGlobals.commandRestUri = GeneralGlobals.serverHostname + ":" + GeneralGlobals.commandRestPort;
GeneralGlobals.graphQlUri = GeneralGlobals.serverHostname + ":" + GeneralGlobals.graphQLPort;
exports.GeneralGlobals = GeneralGlobals;
var DsGlobals = (function () {
    function DsGlobals() {
    }
    return DsGlobals;
}());
DsGlobals.serverURI = process.env.RM_DEEPSTREAM_URI || 'rm:6020';
DsGlobals.rootModelRecordName = 'rm-demo/rootModel';
DsGlobals.eventRecordName = 'rm-demo/event';
exports.DsGlobals = DsGlobals;
var KafkaGlobals = (function () {
    function KafkaGlobals() {
    }
    return KafkaGlobals;
}());
KafkaGlobals.uri = process.env.RM_KAFKA_URI || 'rm:2181';
KafkaGlobals.topicName = Neo4jGlobals.rmDemoDataName.toLowerCase();
KafkaGlobals.topicPartition = '0';
exports.KafkaGlobals = KafkaGlobals;
//# sourceMappingURL=app.globals.js.map