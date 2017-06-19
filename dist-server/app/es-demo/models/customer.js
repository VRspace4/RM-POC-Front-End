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
var verification_output_1 = require("../types/verification-output");
var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer(name, id) {
        if (id === void 0) { id = app_helpers_1.generateUUID(); }
        return _super.call(this, name, id) || this;
    }
    Customer.prototype.verifyCustomerNameDuplication = function (rootModel) {
        var result = this.verifyEntityNameDuplication(rootModel, rootModel.customers);
        return result;
    };
    Customer.prototype.verifyCustomerDeletion = function (rootModel) {
        var result = new verification_output_1.VerificationOutput();
        // Traverse through all allocations from all transponders to make sure
        // the customer isn't being referenced
        for (var _i = 0, _a = rootModel.transponders; _i < _a.length; _i++) {
            var transponder = _a[_i];
            for (var _b = 0, _c = transponder.allocations; _b < _c.length; _b++) {
                var allocation = _c[_b];
                if (allocation.customerId === this.id) {
                    result.passed = false;
                    result.failedMessage =
                        "Cannot delete the customer, " + this.name + ". It's currently assigned to at least one allocation.";
                    break;
                }
                if (result.passed === false) {
                    break;
                }
            }
        }
        return result;
    };
    return Customer;
}(base_entity_1.BaseEntity));
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map