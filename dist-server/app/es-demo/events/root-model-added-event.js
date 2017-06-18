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
var es_event_abstract_1 = require("./es-event.abstract");
var root_model_1 = require("../models/root-model");
var verification_output_1 = require("../types/verification-output");
var app_globals_1 = require("../../app.globals");
//
var RootModelAddedEvent = (function (_super) {
    __extends(RootModelAddedEvent, _super);
    function RootModelAddedEvent(rootModel, rootModelName, rootModelId, transponders, customers, originators) {
        if (rootModelId === void 0) { rootModelId = app_helpers_1.generateUUID(); }
        if (transponders === void 0) { transponders = []; }
        if (customers === void 0) { customers = []; }
        if (originators === void 0) { originators = []; }
        var _this = _super.call(this, null, app_globals_1.RmEventType[app_globals_1.RmEventType.RootModelAddedEvent]) || this;
        _this.rootModel = rootModel;
        _this.rootModelName = rootModelName;
        _this.rootModelId = rootModelId;
        _this.transponders = transponders;
        _this.customers = customers;
        _this.originators = originators;
        _this.rootModelId = _this.ifEmptyGenerateUUID(rootModelId);
        var newRootModel = new root_model_1.RootModel(_this.rootModelName, _this.rootModelId, null, _this.transponders, _this.customers, _this.originators);
        var copyResults = newRootModel.copyPropertiesTo(rootModel);
        if (copyResults.passed === false) {
            throw new Error("Unable to apply new root model. " + copyResults.failedMessage);
        }
        return _this;
    }
    RootModelAddedEvent.prototype.process = function () {
        return this.rootModel;
    };
    RootModelAddedEvent.prototype.verifyEvent = function () {
        var result = new verification_output_1.VerificationOutput();
        // Make sure rootModelName is valid
        result = this.checkIfValidBasicValue(this.rootModelName);
        if (result.passed === false) {
            return result;
        }
        // Verify process()
        var verifyProcessResults = this.verifyProcess();
        var combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);
        return combinedVerifyProcessResults;
    };
    RootModelAddedEvent.prototype.verifyProcess = function () {
        return [new verification_output_1.VerificationOutput()]; // nothing to verify
    };
    return RootModelAddedEvent;
}(es_event_abstract_1.EsEvent));
exports.RootModelAddedEvent = RootModelAddedEvent;
//# sourceMappingURL=root-model-added-event.js.map