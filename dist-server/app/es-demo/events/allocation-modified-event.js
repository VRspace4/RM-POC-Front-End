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
var transponder_service_1 = require("../services/transponder.service");
var verification_output_1 = require("../types/verification-output");
var app_globals_1 = require("../../app.globals");
var AllocationModifiedEvent = (function (_super) {
    __extends(AllocationModifiedEvent, _super);
    function AllocationModifiedEvent(rootModel, transponderId, allocationId, key, value) {
        var _this = _super.call(this, rootModel, key, value, app_globals_1.RmEventType[app_globals_1.RmEventType.AllocationModifiedEvent]) || this;
        _this.transponderId = transponderId;
        _this.allocationId = allocationId;
        return _this;
    }
    AllocationModifiedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        var transponder = this.rootModel.getTransponder(this.transponderId);
        var allocationToChange = transponder.getAllocation(this.allocationId);
        this.applyModifications(allocationToChange);
        return this.rootModel;
    };
    AllocationModifiedEvent.prototype.verifyEvent = function () {
        var result = new verification_output_1.VerificationOutput();
        // Make sure transponderId exists
        var transponderIndex = this.rootModel.getTransponderIndex(this.transponderId);
        result = this.checkIfIdExists(this.transponderId, transponderIndex, 'transponder ID');
        if (result.passed === false) {
            return result;
        }
        // Make sure allocationId exists
        var allocationIndex = this.rootModel.transponders[transponderIndex].getAllocationIndex(this.allocationId);
        result = this.checkIfIdExists(this.allocationId, allocationIndex, 'allocation ID');
        if (result.passed === false) {
            return result;
        }
        // Verify process()
        var verifyProcessResults = this.verifyProcess();
        var combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);
        return combinedVerifyProcessResults;
    };
    AllocationModifiedEvent.prototype.verifyProcess = function () {
        var transponder = this.rootModel.getTransponder(this.transponderId);
        var allocationClone = Object.assign({}, transponder.getAllocation(this.allocationId));
        // Apply modification to the clone and verify. This does not
        // make modification to the official model.
        this.applyModifications(allocationClone);
        var results = transponder_service_1.TransponderService.runAllNewAllocationVerifications(transponder.powerLimit, transponder.allocations, allocationClone);
        results.push(this.verifyKeysAndValues(allocationClone));
        results.push(this.verifyNameIdConflicts(transponder.allocations));
        return results;
    };
    return AllocationModifiedEvent;
}(es_modification_event_1.EsModificationEvent));
exports.AllocationModifiedEvent = AllocationModifiedEvent;
//# sourceMappingURL=allocation-modified-event.js.map