"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transponder_added_event_1 = require("../app/es-demo/events/transponder-added-event");
var transponder_1 = require("../app/es-demo/models/transponder");
var transponder_modified_event_1 = require("../app/es-demo/events/transponder-modified-event");
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
            this.getTransponder(parentId).then(function (transponder) {
                _this._transponder = transponder;
                resultCallback(transponder);
            });
        }
    };
    Controller.getTransponder = function (eventId) {
        return new Promise(function (resolve, reject) {
            event_repository_1.EventRepository.getChainOfEvents(eventId).then(function (events) {
                events.forEach(function (event) {
                    return event.process();
                });
                var transponder = events[0].transponder;
                transponder.eventId = eventId;
                resolve(transponder);
            });
        });
    };
    // static deserializeEvent(event: EsEvent, transponder: Transponder = this._transponder) {
    //   switch(event.name) {
    //     case 'NewTransponderAdded':
    //       return <TransponderAddedEvent>event;
    //   }
    // }
    Controller.createNewTransponder = function (transponderName) {
        this._transponder = new transponder_1.Transponder('Transponder jj1');
        var events = [
            new transponder_added_event_1.TransponderAddedEvent(transponderName),
            new transponder_modified_event_1.TransponderModifiedEvent(this._transponder, ['bandwidth', 'powerLimit'], ['150', '200'])
        ];
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map