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
var es_event_1 = require("./es-event");
var app_helpers_1 = require("../../app.helpers");
var allocation_1 = require("../models/allocation");
var AllocationAddedEvent = (function (_super) {
    __extends(AllocationAddedEvent, _super);
    function AllocationAddedEvent(transponder, startFrequency, stopFrequency, powerUsage, originatorId, name, id) {
        if (name === void 0) { name = ''; }
        if (id === void 0) { id = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, transponder, 'AllocationAddedEvent') || this;
        _this.startFrequency = startFrequency;
        _this.stopFrequency = stopFrequency;
        _this.powerUsage = powerUsage;
        _this.originatorId = originatorId;
        _this.name = name;
        _this.id = id;
        return _this;
    }
    AllocationAddedEvent.prototype.process = function () {
        var newAllocation = new allocation_1.Allocation(this.startFrequency, this.stopFrequency, this.powerUsage, this.originatorId, this.name, this.id);
        this.transponder.addAllocation(newAllocation);
        return this.transponder;
    };
    return AllocationAddedEvent;
}(es_event_1.EsEvent));
exports.AllocationAddedEvent = AllocationAddedEvent;
//# sourceMappingURL=allocation-added-event.js.map