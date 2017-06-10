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
var TransponderRemovedEvent = (function (_super) {
    __extends(TransponderRemovedEvent, _super);
    function TransponderRemovedEvent(rootModel, transponderId) {
        var _this = _super.call(this, rootModel, 'TransponderRemovedEvent') || this;
        _this.transponderId = transponderId;
        return _this;
    }
    TransponderRemovedEvent.prototype.process = function () {
        this.rootModel.removeTransponder(this.transponderId);
        return this.rootModel;
    };
    return TransponderRemovedEvent;
}(es_event_abstract_1.EsEvent));
exports.TransponderRemovedEvent = TransponderRemovedEvent;
//# sourceMappingURL=transponder-removed-event.js.map