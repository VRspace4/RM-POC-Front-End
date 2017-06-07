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
var transponder_1 = require("../models/transponder");
var app_helpers_1 = require("../../app.helpers");
var TransponderAddedEvent = (function (_super) {
    __extends(TransponderAddedEvent, _super);
    function TransponderAddedEvent(transponderName, transponderId) {
        if (transponderId === void 0) { transponderId = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, null, 'TransponderAddedEvent') || this;
        _this.transponderName = transponderName;
        _this.transponderId = transponderId;
        _this.transponder = new transponder_1.Transponder(_this.transponderName, _this.transponderId);
        return _this;
    }
    TransponderAddedEvent.prototype.process = function () {
        return this.transponder;
    };
    return TransponderAddedEvent;
}(es_event_1.EsEvent));
exports.TransponderAddedEvent = TransponderAddedEvent;
//# sourceMappingURL=transponder-added-event.js.map