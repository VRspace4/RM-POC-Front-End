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
var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer(name, id) {
        if (id === void 0) { id = app_helpers_1.generateUUID(); }
        return _super.call(this, name, id) || this;
    }
    return Customer;
}(base_entity_1.BaseEntity));
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map