"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var es_modification_event_1 = require("./es-modification-event");
var app_globals_1 = require("../../app.globals");
var OriginatorModifiedEvent = (function (_super) {
    __extends(OriginatorModifiedEvent, _super);
    function OriginatorModifiedEvent(rootModel, originatorId, key, value) {
        var _this = _super.call(this, rootModel, key, value, app_globals_1.RmEventType[app_globals_1.RmEventType.OriginatorModifiedEvent]) || this;
        _this.originatorId = originatorId;
        return _this;
    }
    OriginatorModifiedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        var originatorToChange = this.rootModel.getOriginator(this.originatorId);
        this.applyModifications(originatorToChange);
        return this.rootModel;
    };
    OriginatorModifiedEvent.prototype.verifyProcess = function () {
        var originatorToBeModified = this.rootModel.getOriginator(this.originatorId);
        var results = [];
        results.push(originatorToBeModified.verifyEntityNameDuplication(this.rootModel, this.rootModel.originators));
        results.push(this.verifyKeysAndValues(originatorToBeModified));
        results.push(this.verifyNameIdConflicts(this.rootModel.originators));
        return results;
    };
    return OriginatorModifiedEvent;
}(es_modification_event_1.EsModificationEvent));
exports.OriginatorModifiedEvent = OriginatorModifiedEvent;
//# sourceMappingURL=originator-modified-event.js.map