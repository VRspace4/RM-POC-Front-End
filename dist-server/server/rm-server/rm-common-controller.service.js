"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rm_common_repository_service_1 = require("./rm-common-repository.service");
var app_globals_1 = require("../../app/app.globals");
var root_model_added_event_1 = require("../../app/es-demo/events/root-model-added-event");
var rm_command_controller_service_1 = require("./command/rm-command-controller.service");
var allocation_removed_event_1 = require("../../app/es-demo/events/allocation-removed-event");
var allocation_modified_event_1 = require("../../app/es-demo/events/allocation-modified-event");
var allocation_added_event_1 = require("../../app/es-demo/events/allocation-added-event");
var originator_removed_event_1 = require("../../app/es-demo/events/originator-removed-event");
var originator_modified_event_1 = require("../../app/es-demo/events/originator-modified-event");
var originator_added_event_1 = require("../../app/es-demo/events/originator-added-event");
var customer_removed_event_1 = require("../../app/es-demo/events/customer-removed-event");
var customer_modified_event_1 = require("../../app/es-demo/events/customer-modified-event");
var customer_added_event_1 = require("../../app/es-demo/events/customer-added-event");
var transponder_removed_event_1 = require("../../app/es-demo/events/transponder-removed-event");
var transponder_modified_event_1 = require("../../app/es-demo/events/transponder-modified-event");
var transponder_added_event_1 = require("../../app/es-demo/events/transponder-added-event");
var root_model_modified_event_1 = require("../../app/es-demo/events/root-model-modified-event");
var rm_command_repository_service_1 = require("./command/rm-command-repository.service");
var RmCommonController = (function () {
    function RmCommonController() {
    }
    RmCommonController.initializeMaterializedView = function () {
        // 1. Makes sure BranchAddedEvent exists
        rm_command_repository_service_1.RmCommandRepository.ensureNodeExist(app_globals_1.Neo4jGlobals.requiredBranchNodeName)
            .then(function (result) {
            if (result.records.length <= 0) {
                console.error(new Error('Fail to ensure there is at least one BranchAddedEvent node in neo4j database!'));
            }
        });
        // 2. Makes sure there's a production root model and is stored in the 'RM-Demo' Data node
        rm_common_repository_service_1.RmCommonRepository.getDataNode(app_globals_1.Neo4jGlobals.rmDemoDataName).then(function (result) {
            var productionRootModelIdIndex = result.key.includes(app_globals_1.Neo4jGlobals.productionRootModelName);
            if (productionRootModelIdIndex === false) {
                // (2) Doesn't exist, do the following:
                // 2a. Create a new RootModelAddedEvent
                var date = new Date();
                var currentDate = '(' + date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() + ')';
                var rootModelAddedEvent = new root_model_added_event_1.RootModelAddedEvent(null, 'Production ' + currentDate);
                var transponderAddedEvent = new transponder_added_event_1.TransponderAddedEvent(null, 'Transponder ' + currentDate);
                // *** latest root model is already set from within this function
                rm_command_controller_service_1.RmCommandController.insertEvents([rootModelAddedEvent, transponderAddedEvent], null, function (rootModel) {
                    // 2b. Insert into database data node
                    rm_common_repository_service_1.RmCommonRepository.setDataNode(app_globals_1.Neo4jGlobals.rmDemoDataName, app_globals_1.Neo4jGlobals.productionRootModelName, rootModel.id);
                });
            }
            else {
                // (2) Production Root Model ID exists; retrieve the production root model
                rm_command_repository_service_1.RmCommandRepository.getProductionEventChain().then(function (events) {
                    rm_command_controller_service_1.RmCommandController._rootModel = events[0].rootModel;
                    events.forEach(function (event) {
                        event.process();
                        // *** latest root model is formed here
                    });
                }).catch(function (e) {
                    console.error(e);
                });
            }
        }).catch(function (e) {
            console.error(e);
        });
    };
    RmCommonController.deserializeEvent = function (event, rootModel) {
        switch (event.name) {
            case 'RootModelAddedEvent':
                var rootModelAddedEvent = event;
                return new root_model_added_event_1.RootModelAddedEvent(rootModel, rootModelAddedEvent.rootModelName, rootModelAddedEvent.rootModelId, rootModelAddedEvent.transponders, rootModelAddedEvent.customers, rootModelAddedEvent.originators);
            case 'RootModelModifiedEvent':
                var rootModelModifiedEvent = event;
                return new root_model_modified_event_1.RootModelModifiedEvent(rootModel, rootModelModifiedEvent.keys, rootModelModifiedEvent.values);
            case 'TransponderAddedEvent':
                var transponderAddedEvent = event;
                return new transponder_added_event_1.TransponderAddedEvent(rootModel, transponderAddedEvent.transponderName, transponderAddedEvent.transponderId);
            case 'TransponderModifiedEvent':
                var transponderModifiedEvent = event;
                return new transponder_modified_event_1.TransponderModifiedEvent(rootModel, transponderModifiedEvent.transponderId, transponderModifiedEvent.keys, transponderModifiedEvent.values);
            case 'TransponderRemovedEvent':
                var transponderRemovedEvent = event;
                return new transponder_removed_event_1.TransponderRemovedEvent(rootModel, transponderRemovedEvent.transponderId);
            case 'CustomerAddedEvent':
                var customerAddedEvent = event;
                return new customer_added_event_1.CustomerAddedEvent(rootModel, customerAddedEvent.customerName, customerAddedEvent.customerId);
            case 'CustomerModifiedEvent':
                var customerModifiedEvent = event;
                return new customer_modified_event_1.CustomerModifiedEvent(rootModel, customerModifiedEvent.customerId, customerModifiedEvent.keys, customerModifiedEvent.values);
            case 'CustomerRemovedEvent':
                var customerRemovedEvent = event;
                return new customer_removed_event_1.CustomerRemovedEvent(rootModel, customerRemovedEvent.customerId);
            case 'OriginatorAddedEvent':
                var originatorAddedEvent = event;
                return new originator_added_event_1.OriginatorAddedEvent(rootModel, originatorAddedEvent.originatorName, originatorAddedEvent.originatorId);
            case 'OriginatorModifiedEvent':
                var originatorModifiedEvent = event;
                return new originator_modified_event_1.OriginatorModifiedEvent(rootModel, originatorModifiedEvent.originatorId, originatorModifiedEvent.keys, originatorModifiedEvent.values);
            case 'OriginatorRemovedEvent':
                var originatorRemovedEvent = event;
                return new originator_removed_event_1.OriginatorRemovedEvent(rootModel, originatorRemovedEvent.originatorId);
            case 'AllocationAddedEvent':
                var allocationAddedEvent = event;
                return new allocation_added_event_1.AllocationAddedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.startFrequency, allocationAddedEvent.stopFrequency, allocationAddedEvent.powerUsage, allocationAddedEvent.customerId, allocationAddedEvent.originatorId, allocationAddedEvent.allocationName, allocationAddedEvent.allocationId);
            case 'AllocationModifiedEvent':
                var allocationModifiedEvent = event;
                return new allocation_modified_event_1.AllocationModifiedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.allocationId, allocationModifiedEvent.keys, allocationModifiedEvent.values);
            case 'AllocationRemovedEvent':
                var allocationRemovedEvent = event;
                return new allocation_removed_event_1.AllocationRemovedEvent(rootModel, allocationRemovedEvent.transponderId, allocationRemovedEvent.allocationId);
            default:
                throw new Error('The event named, [' + event.name + '], has no handler. ' +
                    'Please report this error.');
        }
    };
    return RmCommonController;
}());
exports.RmCommonController = RmCommonController;
//# sourceMappingURL=rm-common-controller.service.js.map