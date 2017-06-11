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
var AllocationModifiedEvent = (function (_super) {
    __extends(AllocationModifiedEvent, _super);
    function AllocationModifiedEvent(rootModel, transponderId, allocationId, key, value) {
        var _this = _super.call(this, rootModel, key, value, 'AllocationModifiedEvent') || this;
        _this.transponderId = transponderId;
        _this.allocationId = allocationId;
        return _this;
    }
    AllocationModifiedEvent.prototype.process = function () {
        var transponder = this.rootModel.getTransponder(this.transponderId);
        var allocationToChange = transponder.getAllocation(this.allocationId);
        this.applyModifications(allocationToChange);
        return this.rootModel;
    };
    return AllocationModifiedEvent;
}(es_modification_event_1.EsModificationEvent));
exports.AllocationModifiedEvent = AllocationModifiedEvent;
//# sourceMappingURL=allocation-modified-event.js.map