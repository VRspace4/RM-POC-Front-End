"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rm_command_repository_service_1 = require("./rm-command-repository.service");
var rm_common_controller_service_1 = require("../common/rm-common-controller.service");
var root_model_added_event_1 = require("../../../app/es-demo/events/root-model-added-event");
var RmCommandController = (function () {
    function RmCommandController() {
    }
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
            this._lastEvent = rm_common_controller_service_1.RmCommonController.deserializeEvent(eventObjects.shift(), null);
            // Commit that event into the database
            this.processEvent(this._lastEvent, parentId)
                .then(function (eventId) {
                // Commit successfully finish
                // Apply the event to the Command side Root Model
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