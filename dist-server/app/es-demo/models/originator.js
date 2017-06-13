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
var verification_output_1 = require("./verification-output");
var Originator = (function (_super) {
    __extends(Originator, _super);
    function Originator(name, id) {
        if (id === void 0) { id = app_helpers_1.generateUUID(); }
        return _super.call(this, name, id) || this;
    }
    Originator.prototype.verifyDeletion = function (rootModel) {
        var result = new verification_output_1.VerificationOutput();
        // Traverse through all allocations from all transponders to make sure
        // the originator isn't being referenced
        for (var _i = 0, _a = rootModel.transponders; _i < _a.length; _i++) {
            var transponder = _a[_i];
            for (var _b = 0, _c = transponder.allocations; _b < _c.length; _b++) {
                var allocation = _c[_b];
                if (allocation.originatorId === this.id) {
                    result.passed = false;
                    result.failedMessage =
                        "Cannot delete the originator, " + this.name + ". It's currently assigned to at least one allocation.";
                    break;
                }
                if (result.passed = false) {
                    break;
                }
            }
        }
        return result;
    };
    return Originator;
}(base_entity_1.BaseEntity));
exports.Originator = Originator;
//# sourceMappingURL=originator.js.map