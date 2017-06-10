"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EsEvent = (function () {
    function EsEvent(transponder, eventName, parent) {
        if (parent === void 0) { parent = null; }
        this.transponder = transponder;
        this.eventName = eventName;
        this.parent = parent;
    }
    return EsEvent;
}());
exports.EsEvent = EsEvent;
//# sourceMappingURL=es-event.js.map