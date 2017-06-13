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
var verification_output_1 = require("../models/verification-output");
var app_globals_1 = require("../../app.globals");
var AllocationRemovedEvent = (function (_super) {
    __extends(AllocationRemovedEvent, _super);
    function AllocationRemovedEvent(rootModel, transponderId, allocationId) {
        var _this = _super.call(this, rootModel, app_globals_1.RmEventType[app_globals_1.RmEventType.AllocationRemovedEvent]) || this;
        _this.transponderId = transponderId;
        _this.allocationId = allocationId;
        return _this;
    }
    AllocationRemovedEvent.prototype.process = function () {
        var transponder = this.rootModel.getTransponder(this.transponderId);
        transponder.removeAllocation(this.allocationId);
        return this.rootModel;
    };
    AllocationRemovedEvent.prototype.verifyProcess = function () {
        return [new verification_output_1.VerificationOutput()]; // nothing to verify
    };
    return AllocationRemovedEvent;
}(es_event_abstract_1.EsEvent));
exports.AllocationRemovedEvent = AllocationRemovedEvent;
//# sourceMappingURL=allocation-removed-event.js.map