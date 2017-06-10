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
var transponder_1 = require("../models/transponder");
var app_helpers_1 = require("../../app.helpers");
var es_event_abstract_1 = require("./es-event.abstract");
var TransponderAddedEvent = (function (_super) {
    __extends(TransponderAddedEvent, _super);
    function TransponderAddedEvent(rootModel, transponderName, transponderId, powerLimit, bandwidth, allocations) {
        if (transponderId === void 0) { transponderId = app_helpers_1.generateUUID(); }
        if (powerLimit === void 0) { powerLimit = 100; }
        if (bandwidth === void 0) { bandwidth = 100; }
        if (allocations === void 0) { allocations = []; }
        var _this = _super.call(this, rootModel, 'TransponderAddedEvent') || this;
        _this.transponderName = transponderName;
        _this.transponderId = transponderId;
        _this.powerLimit = powerLimit;
        _this.bandwidth = bandwidth;
        _this.allocations = allocations;
        return _this;
    }
    TransponderAddedEvent.prototype.process = function () {
        var newTransponder = new transponder_1.Transponder(this.transponderName, this.transponderId, this.powerLimit, this.bandwidth, this.allocations);
        this.rootModel.addTransponder(newTransponder);
        return this.rootModel;
    };
    return TransponderAddedEvent;
}(es_event_abstract_1.EsEvent));
exports.TransponderAddedEvent = TransponderAddedEvent;
//# sourceMappingURL=transponder-added-event.js.map