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
var allocation_1 = require("../models/allocation");
var es_event_abstract_1 = require("./es-event.abstract");
var transponder_service_1 = require("../services/transponder.service");
var verification_output_1 = require("../types/verification-output");
var app_globals_1 = require("../../app.globals");
var AllocationAddedEvent = (function (_super) {
    __extends(AllocationAddedEvent, _super);
    function AllocationAddedEvent(rootModel, transponderId, startFrequency, stopFrequency, powerUsage, customerId, originatorId, allocationName, allocationId) {
        if (allocationName === void 0) { allocationName = ''; }
        if (allocationId === void 0) { allocationId = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, rootModel, app_globals_1.RmEventType[app_globals_1.RmEventType.AllocationAddedEvent]) || this;
        _this.transponderId = transponderId;
        _this.startFrequency = startFrequency;
        _this.stopFrequency = stopFrequency;
        _this.powerUsage = powerUsage;
        _this.customerId = customerId;
        _this.originatorId = originatorId;
        _this.allocationName = allocationName;
        _this.allocationId = allocationId;
        _this.allocationId = _this.ifEmptyGenerateUUID(allocationId);
        return _this;
    }
    AllocationAddedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        var newAllocation = new allocation_1.Allocation(this.startFrequency, this.stopFrequency, this.powerUsage, this.customerId, this.originatorId, this.allocationName, this.allocationId);
        var transponderToChange = this.rootModel.getTransponder(this.transponderId);
        transponderToChange.addAllocation(newAllocation);
        return this.rootModel;
    };
    AllocationAddedEvent.prototype.verifyEvent = function () {
        var result = new verification_output_1.VerificationOutput();
        // Make sure customerId exists
        var customerIndex = this.rootModel.getCustomerIndex(this.customerId);
        result = this.checkIfIdExists(this.customerId, customerIndex, 'customer ID');
        if (result.passed === false) {
            return result;
        }
        // Make sure originatorId exists
        var originatorIndex = this.rootModel.getOriginatorIndex(this.originatorId);
        result = this.checkIfIdExists(this.originatorId, originatorIndex, 'originator ID');
        if (result.passed === false) {
            return result;
        }
        // Make sure transponderId exists
        var transponderIndex = this.rootModel.getTransponderIndex(this.transponderId);
        result = this.checkIfIdExists(this.transponderId, transponderIndex, 'transponder ID');
        if (result.passed === false) {
            return result;
        }
        // Verify process()
        var verifyProcessResults = this.verifyProcess();
        var combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);
        return combinedVerifyProcessResults;
    };
    AllocationAddedEvent.prototype.verifyProcess = function () {
        var transponder = this.rootModel.getTransponder(this.transponderId);
        var allocation = new allocation_1.Allocation(this.startFrequency, this.stopFrequency, this.powerUsage, this.customerId, this.originatorId, this.allocationName, this.allocationId);
        var results = transponder_service_1.TransponderService.runAllNewAllocationVerifications(transponder.powerLimit, transponder.allocations, allocation);
        return results;
    };
    return AllocationAddedEvent;
}(es_event_abstract_1.EsEvent));
exports.AllocationAddedEvent = AllocationAddedEvent;
//# sourceMappingURL=allocation-added-event.js.map