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
var customer_1 = require("../models/customer");
var app_globals_1 = require("../../app.globals");
var CustomerModifiedEvent = (function (_super) {
    __extends(CustomerModifiedEvent, _super);
    function CustomerModifiedEvent(rootModel, customerId, key, value) {
        var _this = _super.call(this, rootModel, key, value, app_globals_1.RmEventType[app_globals_1.RmEventType.CustomerModifiedEvent]) || this;
        _this.customerId = customerId;
        return _this;
    }
    CustomerModifiedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        var customerToChange = this.rootModel.getCustomer(this.customerId);
        this.applyModifications(customerToChange);
        return this.rootModel;
    };
    CustomerModifiedEvent.prototype.verifyProcess = function () {
        var results = [];
        results.push(this.verifyKeysAndValues(new customer_1.Customer('abc')));
        results.push(this.verifyNameIdConflicts(this.rootModel.customers));
        return results;
    };
    return CustomerModifiedEvent;
}(es_modification_event_1.EsModificationEvent));
exports.CustomerModifiedEvent = CustomerModifiedEvent;
//# sourceMappingURL=customer-modified-event.js.map