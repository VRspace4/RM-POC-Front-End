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
var transponder_service_1 = require("../services/transponder.service");
var Transponder = (function (_super) {
    __extends(Transponder, _super);
    function Transponder(name, id, powerLimit, // W
        bandwidth, // Ghz
        allocations) {
        if (id === void 0) { id = null; }
        if (powerLimit === void 0) { powerLimit = 100; }
        if (bandwidth === void 0) { bandwidth = 100; }
        if (allocations === void 0) { allocations = []; }
        var _this = _super.call(this, name, id) || this;
        _this.powerLimit = powerLimit;
        _this.bandwidth = bandwidth;
        _this.allocations = allocations;
        return _this;
    }
    Transponder.prototype.getAllocation = function (allocationId) {
        var entity = this.getEntity(allocationId, this.allocations);
        return entity;
    };
    Transponder.prototype.addAllocation = function (allocation) {
        if (transponder_service_1.TransponderService.runAllNewAllocationVerifications(this.powerLimit, this.allocations, allocation)) {
            this.addEntity(allocation, this.allocations);
        }
    };
    Transponder.prototype.removeAllocation = function (allocationId) {
        this.removeEntity(allocationId, this.allocations);
    };
    return Transponder;
}(base_entity_1.BaseEntity));
exports.Transponder = Transponder;
//# sourceMappingURL=transponder.js.map