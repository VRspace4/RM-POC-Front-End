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
var CustomerRemovedEvent = (function (_super) {
    __extends(CustomerRemovedEvent, _super);
    function CustomerRemovedEvent(rootModel, customerId) {
        var _this = _super.call(this, rootModel, 'CustomerRemovedEvent') || this;
        _this.customerId = customerId;
        return _this;
    }
    CustomerRemovedEvent.prototype.process = function () {
        this.rootModel.removeCustomer(this.customerId);
        return this.rootModel;
    };
    return CustomerRemovedEvent;
}(es_event_abstract_1.EsEvent));
exports.CustomerRemovedEvent = CustomerRemovedEvent;
//# sourceMappingURL=customer-removed-event.js.map