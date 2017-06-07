"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var es_event_1 = require("./es-event");
var EsModificationEvent = (function (_super) {
    __extends(EsModificationEvent, _super);
    function EsModificationEvent(transponder, key, value) {
        var _this = _super.call(this, transponder, 'TransponderModified') || this;
        _this.key = key;
        _this.value = value;
        return _this;
    }
    EsModificationEvent.prototype.applyModifications = function (entity) {
        var _this = this;
        this.key.forEach(function (keyItem, index) {
            if (entity.hasOwnProperty(keyItem)) {
                entity[keyItem] = _this.value[index];
            }
            else {
                throw new Error('The property, ' + keyItem + ', does not exist!');
            }
        });
    };
    return EsModificationEvent;
}(es_event_1.EsEvent));
exports.EsModificationEvent = EsModificationEvent;
//# sourceMappingURL=es-modification-event.js.map