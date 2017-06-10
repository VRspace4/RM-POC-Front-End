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
var customer_1 = require("../models/customer");
var es_event_abstract_1 = require("./es-event.abstract");
var CustomerAddedEvent = (function (_super) {
    __extends(CustomerAddedEvent, _super);
    function CustomerAddedEvent(rootModel, customerName, customerId) {
        if (customerId === void 0) { customerId = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, rootModel, 'CustomerAddedEvent') || this;
        _this.customerName = customerName;
        _this.customerId = customerId;
        return _this;
    }
    CustomerAddedEvent.prototype.process = function () {
        var newCustomer = new customer_1.Customer(this.customerName, this.customerId);
        this.rootModel.addCustomer(newCustomer);
        return this.rootModel;
    };
    return CustomerAddedEvent;
}(es_event_abstract_1.EsEvent));
exports.CustomerAddedEvent = CustomerAddedEvent;
//# sourceMappingURL=customer-added-event.js.map