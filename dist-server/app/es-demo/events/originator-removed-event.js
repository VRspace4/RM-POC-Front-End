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
var es_event_abstract_1 = require("./es-event.abstract");
var verification_output_1 = require("../types/verification-output");
var app_globals_1 = require("../../app.globals");
var OriginatorRemovedEvent = (function (_super) {
    __extends(OriginatorRemovedEvent, _super);
    function OriginatorRemovedEvent(rootModel, originatorId) {
        var _this = _super.call(this, rootModel, app_globals_1.RmEventType[app_globals_1.RmEventType.OriginatorRemovedEvent]) || this;
        _this.originatorId = originatorId;
        return _this;
    }
    OriginatorRemovedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        this.rootModel.removeOriginator(this.originatorId);
        return this.rootModel;
    };
    OriginatorRemovedEvent.prototype.verifyEvent = function () {
        var result = new verification_output_1.VerificationOutput();
        // Make sure originatorId exists
        var originatorIndex = this.rootModel.getTransponderIndex(this.originatorId);
        result = this.checkIfIdExists(this.originatorId, originatorIndex, 'originator ID');
        if (result.passed === false) {
            return result;
        }
        // Verify process()
        var verifyProcessResults = this.verifyProcess();
        var combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);
        return combinedVerifyProcessResults;
    };
    OriginatorRemovedEvent.prototype.verifyProcess = function () {
        var originatorToBeRemoved = this.rootModel.getOriginator(this.originatorId);
        var result = originatorToBeRemoved.verifyDeletion(this.rootModel);
        return [result];
    };
    return OriginatorRemovedEvent;
}(es_event_abstract_1.EsEvent));
exports.OriginatorRemovedEvent = OriginatorRemovedEvent;
//# sourceMappingURL=originator-removed-event.js.map