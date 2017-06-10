"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category = (function () {
    function Category(_id, _name) {
        this._id = _id;
        this._name = _name;
    }
    Object.defineProperty(Category.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map