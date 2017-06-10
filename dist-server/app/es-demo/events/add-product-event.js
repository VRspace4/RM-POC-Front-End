"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../models/product");
var AddProductEvent = (function () {
    function AddProductEvent(catalog, productId, productName, productPrice, productVisible, productColor, productCategoryId, name, parent) {
        if (name === void 0) { name = 'AddProductEvent'; }
        if (parent === void 0) { parent = null; }
        this.catalog = catalog;
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productVisible = productVisible;
        this.productColor = productColor;
        this.productCategoryId = productCategoryId;
        this.name = name;
        this.parent = parent;
    }
    AddProductEvent.prototype.process = function () {
        this.catalog.addProduct(new product_1.Product(this.productId, this.productName, this.productPrice, this.productVisible, this.productColor, this.productCategoryId));
    };
    return AddProductEvent;
}());
exports.AddProductEvent = AddProductEvent;
//# sourceMappingURL=add-product-event.js.map