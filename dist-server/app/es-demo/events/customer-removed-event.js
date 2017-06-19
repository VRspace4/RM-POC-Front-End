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
var verification_output_1 = require("../types/verification-output");
var app_globals_1 = require("../../app.globals");
var CustomerRemovedEvent = (function (_super) {
    __extends(CustomerRemovedEvent, _super);
    function CustomerRemovedEvent(rootModel, customerId) {
        var _this = _super.call(this, rootModel, app_globals_1.RmEventType[app_globals_1.RmEventType.CustomerRemovedEvent]) || this;
        _this.customerId = customerId;
        return _this;
    }
    CustomerRemovedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        this.rootModel.removeCustomer(this.customerId);
        return this.rootModel;
    };
    CustomerRemovedEvent.prototype.verifyEvent = function () {
        var result = new verification_output_1.VerificationOutput();
        // Make sure customerId exists
        var customerIndex = this.rootModel.getCustomerIndex(this.customerId);
        result = this.checkIfIdExists(this.customerId, customerIndex, 'customer ID');
        if (result.passed === false) {
            return result;
        }
        // Verify process()
        var verifyProcessResults = this.verifyProcess();
        var combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);
        return combinedVerifyProcessResults;
    };
    CustomerRemovedEvent.prototype.verifyProcess = function () {
        var customerToBeRemoved = this.rootModel.getCustomer(this.customerId);
        var result = customerToBeRemoved.verifyCustomerDeletion(this.rootModel);
        return [result];
    };
    return CustomerRemovedEvent;
}(es_event_abstract_1.EsEvent));
exports.CustomerRemovedEvent = CustomerRemovedEvent;
//# sourceMappingURL=customer-removed-event.js.map