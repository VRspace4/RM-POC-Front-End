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
var es_modification_event_1 = require("./es-modification-event");
var OriginatorModified = (function (_super) {
    __extends(OriginatorModified, _super);
    function OriginatorModified(rootModel, originatorId, key, value) {
        var _this = _super.call(this, rootModel, key, value) || this;
        _this.originatorId = originatorId;
        return _this;
    }
    OriginatorModified.prototype.process = function () {
        var originatorToChange = this.rootModel.getOriginator(this.originatorId);
        this.applyModifications(originatorToChange);
        return this.rootModel;
    };
    return OriginatorModified;
}(es_modification_event_1.EsModificationEvent));
exports.OriginatorModified = OriginatorModified;
//# sourceMappingURL=originator-modified-event.js.map