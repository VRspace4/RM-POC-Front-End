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
var transponder_1 = require("../models/transponder");
var app_globals_1 = require("../../app.globals");
var TransponderModifiedEvent = (function (_super) {
    __extends(TransponderModifiedEvent, _super);
    function TransponderModifiedEvent(rootModel, transponderId, keys, values) {
        var _this = _super.call(this, rootModel, keys, values, app_globals_1.RmEventType[app_globals_1.RmEventType.TransponderModifiedEvent]) || this;
        _this.transponderId = transponderId;
        return _this;
    }
    TransponderModifiedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        var transponderToChange = this.rootModel.getTransponder(this.transponderId);
        if (typeof transponderToChange !== 'undefined') {
            this.applyModifications(transponderToChange);
        }
        else {
            throw new Error('Invalid transponder id');
        }
        return this.rootModel;
    };
    TransponderModifiedEvent.prototype.verifyProcess = function () {
        var results = [];
        results.push(this.verifyKeysAndValues(new transponder_1.Transponder('abc')));
        results.push(this.verifyNameIdConflicts(this.rootModel.transponders));
        return results;
    };
    return TransponderModifiedEvent;
}(es_modification_event_1.EsModificationEvent));
exports.TransponderModifiedEvent = TransponderModifiedEvent;
//# sourceMappingURL=transponder-modified-event.js.map