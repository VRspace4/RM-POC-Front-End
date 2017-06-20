"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddBranchEvent = (function () {
    function AddBranchEvent(catalog, branchName, name, parent) {
        if (name === void 0) { name = 'AddBranchEvent'; }
        if (parent === void 0) { parent = null; }
        this.catalog = catalog;
        this.branchName = branchName;
        this.name = name;
        this.parent = parent;
    }
    AddBranchEvent.prototype.process = function () {
    };
    return AddBranchEvent;
}());
exports.AddBranchEvent = AddBranchEvent;
//# sourceMappingURL=add-branch-event.js.map