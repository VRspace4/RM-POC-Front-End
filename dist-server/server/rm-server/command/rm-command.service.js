"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_repository_1 = require("../../event-repository");
var RmCommandService = (function () {
    function RmCommandService() {
    }
    /**
     * Inserts the event, either new root model event or any other, and then returns
     * the root model object through a callback
     * @param eventObjects
     * @param parentId
     * @param resultCallback
     */
    RmCommandService.insertEvents = function (eventObjects, parentId, resultCallback) {
        var _this = this;
        if (eventObjects.length > 0) {
            var event_1 = event_repository_1.EventRepository.deserializeEvent(eventObjects.shift(), null);
            event_repository_1.EventRepository.processEvent(event_1, parentId).then(function (eventId) {
                _this.insertEvents(eventObjects, eventId, resultCallback);
            });
        }
    };
    return RmCommandService;
}());
exports.RmCommandService = RmCommandService;
//# sourceMappingURL=rm-command.service.js.map