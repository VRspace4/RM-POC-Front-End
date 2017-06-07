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
var TransponderModifiedEvent = (function (_super) {
    __extends(TransponderModifiedEvent, _super);
    function TransponderModifiedEvent(transponder, key, value) {
        return _super.call(this, transponder, key, value) || this;
    }
    TransponderModifiedEvent.prototype.process = function () {
        this.applyModifications(this.transponder);
        return this.transponder;
    };
    return TransponderModifiedEvent;
}(es_modification_event_1.EsModificationEvent));
exports.TransponderModifiedEvent = TransponderModifiedEvent;
//# sourceMappingURL=transponder-modified-event.js.map