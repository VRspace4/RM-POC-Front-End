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
var app_globals_1 = require("../../app.globals");
var RootModelModifiedEvent = (function (_super) {
    __extends(RootModelModifiedEvent, _super);
    function RootModelModifiedEvent(rootModel, key, value) {
        return _super.call(this, rootModel, key, value, app_globals_1.RmEventType[app_globals_1.RmEventType.RootModelModifiedEvent]) || this;
    }
    RootModelModifiedEvent.prototype.process = function () {
        this.throwIfVerificationFails();
        this.applyModifications(this.rootModel);
        return this.rootModel;
    };
    RootModelModifiedEvent.prototype.verifyEvent = function () {
        // Verify process()
        var verifyProcessResults = this.verifyProcess();
        var combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);
        return combinedVerifyProcessResults;
    };
    RootModelModifiedEvent.prototype.verifyProcess = function () {
        var result = this.verifyKeysAndValues(this.rootModel);
        return [result];
    };
    return RootModelModifiedEvent;
}(es_modification_event_1.EsModificationEvent));
exports.RootModelModifiedEvent = RootModelModifiedEvent;
//# sourceMappingURL=root-model-modified-event.js.map