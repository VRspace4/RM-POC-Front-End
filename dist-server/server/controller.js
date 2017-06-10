"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_repository_1 = require("./event-repository");
var Controller = (function () {
    function Controller() {
    }
    Controller.insertEvents = function (eventObjects, parentId, resultCallback) {
        var _this = this;
        if (eventObjects.length > 0) {
            var event_1 = event_repository_1.EventRepository.deserializeEvent(eventObjects.shift(), null);
            event_repository_1.EventRepository.processEvent(event_1, parentId).then(function (eventId) {
                _this.insertEvents(eventObjects, eventId, resultCallback);
            }).catch(function (e) { return resultCallback(e); });
        }
        else {
            this.getTransponder(parentId).then(function (rootModel) {
                resultCallback(rootModel);
            });
        }
    };
    Controller.getTransponder = function (eventId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            event_repository_1.EventRepository.getChainOfEvents(eventId).then(function (events) {
                events.forEach(function (event) {
                    return event.process();
                });
                // apply this root model to the class level root model
                _this._rootModel = events[0].rootModel;
                _this._rootModel.eventId = eventId;
                resolve(_this._rootModel);
            });
        });
    };
    Controller.createNewRootModel = function (rootModelName) {
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map