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
var base_entity_1 = require("./base-entity");
var app_helpers_1 = require("../../app.helpers");
var transponder_service_1 = require("../services/transponder.service");
var Transponder = (function (_super) {
    __extends(Transponder, _super);
    function Transponder(name, id, eventId, powerLimit, // W
        bandwidth, // Ghz
        customers, allocations) {
        if (id === void 0) { id = app_helpers_1.generateUUID(); }
        if (eventId === void 0) { eventId = null; }
        if (powerLimit === void 0) { powerLimit = 100; }
        if (bandwidth === void 0) { bandwidth = 100; }
        if (customers === void 0) { customers = []; }
        if (allocations === void 0) { allocations = []; }
        var _this = _super.call(this, name, id) || this;
        _this.eventId = eventId;
        _this.powerLimit = powerLimit;
        _this.bandwidth = bandwidth;
        _this.customers = customers;
        _this.allocations = allocations;
        return _this;
    }
    Transponder.prototype.getCustomer = function (customerId) {
        return this.customers.find(function (customer) { return customer.id === customerId; });
    };
    Transponder.prototype.addCustomer = function (customer) {
        this.customers.push(customer);
    };
    Transponder.prototype.removeCustomer = function (customerId) {
        var index = this.customers.findIndex(function (customer) { return customer.id === customerId; });
        if (index >= 0) {
            this.customers.splice(index, 1);
        }
    };
    Transponder.prototype.getAllocation = function (allocationId) {
        return this.allocations.find(function (allocation) { return allocation.id === allocationId; });
    };
    Transponder.prototype.addAllocation = function (allocation) {
        if (transponder_service_1.TransponderService.runAllNewAllocationVerifications(this.allocations, allocation)) {
            this.allocations.push(allocation);
        }
    };
    Transponder.prototype.removeAllocation = function (allocationId) {
        var index = this.allocations.findIndex(function (allocation) { return allocation.id === allocationId; });
        if (index >= 0) {
            this.allocations.splice(index, 1);
        }
    };
    return Transponder;
}(base_entity_1.BaseEntity));
exports.Transponder = Transponder;
//# sourceMappingURL=transponder.js.map