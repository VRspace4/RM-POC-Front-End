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
var NewTransponderAddedEvent = (function (_super) {
    __extends(NewTransponderAddedEvent, _super);
    function NewTransponderAddedEvent(transponderName, transponderId) {
        if (transponderId === void 0) { transponderId = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, null, 'NewTransponderAddedEvent') || this;
        _this.transponderName = transponderName;
        _this.transponderId = transponderId;
        _this.transponder = new transponder_1.Transponder(_this.transponderName, _this.transponderId);
        return _this;
    }
    NewTransponderAddedEvent.prototype.process = function () {
        console.log('inside NewTransponderAddedEvent process');
        return this.transponder;
    };
    return NewTransponderAddedEvent;
}(es_event_1.EsEvent));
exports.NewTransponderAddedEvent = NewTransponderAddedEvent;
//# sourceMappingURL=new-transponder-added-event.js.map