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
var CustomerModifiedEvent = (function (_super) {
    __extends(CustomerModifiedEvent, _super);
    function CustomerModifiedEvent(transponder, customerId, key, value) {
        var _this = _super.call(this, transponder, key, value) || this;
        _this.customerId = customerId;
        return _this;
    }
    CustomerModifiedEvent.prototype.process = function () {
        var customerToModify = this.transponder.getCustomer(this.customerId);
        if (customerToModify) {
            this.applyModifications(customerToModify);
        }
        else {
            throw new Error('The customer to be modified with id, ' + this.customerId + ', does not exist!');
        }
        return this.transponder;
    };
    return CustomerModifiedEvent;
}(es_modification_event_1.EsModificationEvent));
exports.CustomerModifiedEvent = CustomerModifiedEvent;
//# sourceMappingURL=customer-modified-event.js.map