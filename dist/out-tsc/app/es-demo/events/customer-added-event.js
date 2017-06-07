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
var customer_1 = require("../models/customer");
var CustomerAddedEvent = (function (_super) {
    __extends(CustomerAddedEvent, _super);
    function CustomerAddedEvent(transponder, name, id) {
        if (id === void 0) { id = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, transponder, 'CustomerAddedEvent') || this;
        _this.name = name;
        _this.id = id;
        return _this;
    }
    CustomerAddedEvent.prototype.process = function () {
        this.transponder.addCustomer(new customer_1.Customer(this.name, this.id));
        return this.transponder;
    };
    return CustomerAddedEvent;
}(es_event_1.EsEvent));
exports.CustomerAddedEvent = CustomerAddedEvent;
//# sourceMappingURL=customer-added-event.js.map