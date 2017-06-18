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
var app_helpers_1 = require("../../app.helpers");
var originator_1 = require("../models/originator");
var es_event_abstract_1 = require("./es-event.abstract");
var verification_output_1 = require("../types/verification-output");
var app_globals_1 = require("../../app.globals");
var OriginatorAddedEvent = (function (_super) {
    __extends(OriginatorAddedEvent, _super);
    function OriginatorAddedEvent(rootModel, originatorName, originatorId) {
        if (originatorId === void 0) { originatorId = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, rootModel, app_globals_1.RmEventType[app_globals_1.RmEventType.OriginatorAddedEvent]) || this;
        _this.originatorName = originatorName;
        _this.originatorId = originatorId;
        _this.originatorId = _this.ifEmptyGenerateUUID(originatorId);
        return _this;
    }
    OriginatorAddedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        var newOriginator = new originator_1.Originator(this.originatorName, this.originatorId);
        this.rootModel.addOriginator(newOriginator);
        return this.rootModel;
    };
    OriginatorAddedEvent.prototype.verifyEvent = function () {
        var result = new verification_output_1.VerificationOutput();
        // Make sure originatorName is valid
        result = this.checkIfValidBasicValue(this.originatorName);
        if (result.passed === false) {
            return result;
        }
        // Verify process()
        var verifyProcessResults = this.verifyProcess();
        var combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);
        return combinedVerifyProcessResults;
    };
    OriginatorAddedEvent.prototype.verifyProcess = function () {
        var originatorToBeAdded = new originator_1.Originator(this.originatorName, this.originatorId);
        var result = originatorToBeAdded.verifyEntityNameDuplication(this.rootModel, this.rootModel.originators);
        return [result];
    };
    return OriginatorAddedEvent;
}(es_event_abstract_1.EsEvent));
exports.OriginatorAddedEvent = OriginatorAddedEvent;
//# sourceMappingURL=originator-added-event.js.map