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
var es_event_abstract_1 = require("./es-event.abstract");
var OriginatorRemovedEvent = (function (_super) {
    __extends(OriginatorRemovedEvent, _super);
    function OriginatorRemovedEvent(rootModel, originatorId) {
        var _this = _super.call(this, rootModel, 'OriginatorRemovedEvent') || this;
        _this.originatorId = originatorId;
        return _this;
    }
    OriginatorRemovedEvent.prototype.process = function () {
        this.rootModel.removeOriginator(this.originatorId);
        return this.rootModel;
    };
    return OriginatorRemovedEvent;
}(es_event_abstract_1.EsEvent));
exports.OriginatorRemovedEvent = OriginatorRemovedEvent;
//# sourceMappingURL=originator-removed-event.js.map