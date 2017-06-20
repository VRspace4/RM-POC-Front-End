"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SetProductAttributeEvent = (function () {
    function SetProductAttributeEvent(catalog, productId, key, value, name, parent) {
        if (name === void 0) { name = 'SetProductAttributeEvent'; }
        if (parent === void 0) { parent = null; }
        this.catalog = catalog;
        this.productId = productId;
        this.key = key;
        this.value = value;
        this.name = name;
        this.parent = parent;
    }
    SetProductAttributeEvent.prototype.process = function () {
        var product = this.catalog.getProduct(this.productId);
        product[this.key] = this.value;
    };
    return SetProductAttributeEvent;
}());
exports.SetProductAttributeEvent = SetProductAttributeEvent;
//# sourceMappingURL=set-product-attribute-event.js.map