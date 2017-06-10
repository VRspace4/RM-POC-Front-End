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
var app_helpers_1 = require("../../app.helpers");
var originator_1 = require("../models/originator");
var es_event_abstract_1 = require("./es-event.abstract");
// TODO create ResourceEvent
var OriginatorAddedEvent = (function (_super) {
    __extends(OriginatorAddedEvent, _super);
    function OriginatorAddedEvent(rootModel, originatorName, originatorId) {
        if (originatorId === void 0) { originatorId = app_helpers_1.generateUUID(); }
        var _this = _super.call(this, transponder, 'OriginatorAddedEvent') || this;
        _this.originatorName = originatorName;
        _this.originatorId = originatorId;
        return _this;
    }
    OriginatorAddedEvent.prototype.process = function () {
        this.transponder.addCustomer(new originator_1.Originator(this.originatorName, this.originatorId));
        return this.transponder;
    };
    return OriginatorAddedEvent;
}(es_event_abstract_1.EsEvent));
exports.OriginatorAddedEvent = OriginatorAddedEvent;
//# sourceMappingURL=originator-add-event.js.map