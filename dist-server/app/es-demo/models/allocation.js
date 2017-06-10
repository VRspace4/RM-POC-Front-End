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
var Allocation = (function (_super) {
    __extends(Allocation, _super);
    function Allocation(startFrequency, stopFrequency, powerUsage, customerId, originatorId, name, id) {
        if (name === void 0) { name = ''; }
        if (id === void 0) { id = ''; }
        var _this = _super.call(this, name, id) || this;
        _this.startFrequency = startFrequency;
        _this.stopFrequency = stopFrequency;
        _this.powerUsage = powerUsage;
        _this.customerId = customerId;
        _this.originatorId = originatorId;
        return _this;
    }
    return Allocation;
}(base_entity_1.BaseEntity));
exports.Allocation = Allocation;
//# sourceMappingURL=allocation.js.map