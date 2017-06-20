"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RemoveProductEvent = (function () {
    function RemoveProductEvent(catalog, productId, name, parent) {
        if (name === void 0) { name = 'RemoveProductEvent'; }
        if (parent === void 0) { parent = null; }
        this.catalog = catalog;
        this.productId = productId;
        this.name = name;
        this.parent = parent;
    }
    RemoveProductEvent.prototype.process = function () {
        this.catalog.removeProduct(this.productId);
        console.log("RemoveProductEvent's process()");
    };
    return RemoveProductEvent;
}());
exports.RemoveProductEvent = RemoveProductEvent;
//# sourceMappingURL=remove-product-event.js.map