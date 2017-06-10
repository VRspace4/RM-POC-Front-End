"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Catalog = (function () {
    function Catalog(_id, _name, _categories, _products) {
        if (_categories === void 0) { _categories = []; }
        if (_products === void 0) { _products = []; }
        this._id = _id;
        this._name = _name;
        this._categories = _categories;
        this._products = _products;
    }
    Object.defineProperty(Catalog.prototype, "eventId", {
        get: function () {
            return this._eventId;
        },
        set: function (value) {
            this._eventId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Catalog.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Catalog.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Catalog.prototype, "categories", {
        get: function () {
            return this._categories;
        },
        set: function (value) {
            this._categories = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Catalog.prototype, "products", {
        get: function () {
            return this._products;
        },
        set: function (value) {
            this._products = value;
        },
        enumerable: true,
        configurable: true
    });
    Catalog.prototype.addCategory = function (category) {
        this._categories.push(category);
    };
    Catalog.prototype.addProduct = function (product) {
        this._products.push(product);
    };
    Catalog.prototype.removeProduct = function (productId) {
        var index = this._products.findIndex(function (product) { return product.id === productId; });
        if (index >= 0) {
            this._products.splice(index, 1);
        }
    };
    Catalog.prototype.getCategory = function (categoryId) {
        return this._categories.find(function (category) { return category.id === categoryId; });
    };
    Catalog.prototype.getProduct = function (productId) {
        return this.products.find(function (product) { return product.id === productId; });
    };
    return Catalog;
}());
exports.Catalog = Catalog;
//# sourceMappingURL=catalog.js.map