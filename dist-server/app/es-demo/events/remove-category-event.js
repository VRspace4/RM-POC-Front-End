"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RemoveCategoryEvent = (function () {
    function RemoveCategoryEvent(catalog, categoryId, name, parent) {
        if (name === void 0) { name = 'RemoveCategoryEvent'; }
        if (parent === void 0) { parent = null; }
        this.catalog = catalog;
        this.categoryId = categoryId;
        this.name = name;
        this.parent = parent;
    }
    return RemoveCategoryEvent;
}());
exports.RemoveCategoryEvent = RemoveCategoryEvent;
//# sourceMappingURL=remove-category-event.js.map