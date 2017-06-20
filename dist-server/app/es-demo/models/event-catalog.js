"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CatalogEvent = (function () {
    function CatalogEvent(_catalogName, _catalogId, _name, _id) {
        this._catalogName = _catalogName;
        this._catalogId = _catalogId;
        this._name = _name;
        this._id = _id;
    }
    Object.defineProperty(CatalogEvent.prototype, "catalogName", {
        get: function () {
            return this._catalogName;
        },
        set: function (value) {
            this._catalogName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CatalogEvent.prototype, "catalogId", {
        get: function () {
            return this._catalogId;
        },
        set: function (value) {
            this._catalogId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CatalogEvent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CatalogEvent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    return CatalogEvent;
}());
exports.CatalogEvent = CatalogEvent;
//# sourceMappingURL=event-catalog.js.map