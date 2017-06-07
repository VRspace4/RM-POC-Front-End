"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = require("../models/category");
var AddCategoryEvent = (function () {
    function AddCategoryEvent(catalog, categoryId, categoryName, name, parent) {
        if (name === void 0) { name = 'AddCategoryEvent'; }
        if (parent === void 0) { parent = null; }
        this.catalog = catalog;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.name = name;
        this.parent = parent;
    }
    AddCategoryEvent.prototype.process = function () {
        this.catalog.addCategory(new category_1.Category(this.categoryId, this.categoryName));
    };
    return AddCategoryEvent;
}());
exports.AddCategoryEvent = AddCategoryEvent;
//# sourceMappingURL=add-category-event.js.map