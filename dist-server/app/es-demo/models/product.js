"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = (function () {
    function Product(_id, _name, _price, _visible, _color, _categoryId) {
        this._id = _id;
        this._name = _name;
        this._price = _price;
        this._visible = _visible;
        this._color = _color;
        this._categoryId = _categoryId;
    }
    Object.defineProperty(Product.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "categoryId", {
        get: function () {
            return this._categoryId;
        },
        set: function (value) {
            this._categoryId = value;
        },
        enumerable: true,
        configurable: true
    });
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=product.js.map