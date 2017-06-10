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
var AllocationAddedEvent = (function (_super) {
    __extends(AllocationAddedEvent, _super);
    function AllocationAddedEvent(rootModel, transponderId, startFrequency, stopFrequency, powerUsage, customerId, originatorId, allocationName, allocationId) {
        if (allocationName === void 0) { allocationName = ''; }
        if (allocationId === void 0) { allocationId = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, rootModel, 'AllocationAddedEvent') || this;
        _this.transponderId = transponderId;
        _this.startFrequency = startFrequency;
        _this.stopFrequency = stopFrequency;
        _this.powerUsage = powerUsage;
        _this.customerId = customerId;
        _this.originatorId = originatorId;
        _this.allocationName = allocationName;
        _this.allocationId = allocationId;
        return _this;
    }
    AllocationAddedEvent.prototype.process = function () {
        var newAllocation = new allocation_1.Allocation(this.startFrequency, this.stopFrequency, this.powerUsage, this.customerId, this.originatorId, this.allocationName, this.allocationId);
        var transponderToChange = this.rootModel.getTransponder(this.transponderId);
        transponderToChange.addAllocation(newAllocation);
        return this.rootModel;
    };
    return AllocationAddedEvent;
}(es_event_abstract_1.EsEvent));
exports.AllocationAddedEvent = AllocationAddedEvent;
//# sourceMappingURL=allocation-added-event.js.map