"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseMessageType;
(function (ResponseMessageType) {
    ResponseMessageType[ResponseMessageType["success"] = 0] = "success";
    ResponseMessageType[ResponseMessageType["information"] = 1] = "information";
    ResponseMessageType[ResponseMessageType["warning"] = 2] = "warning";
    ResponseMessageType[ResponseMessageType["error"] = 3] = "error";
})(ResponseMessageType = exports.ResponseMessageType || (exports.ResponseMessageType = {}));
var ResponseMessage = (function () {
    function ResponseMessage(type, title, message) {
        if (type === void 0) { type = ResponseMessageType[ResponseMessageType.success]; }
        if (title === void 0) { title = ''; }
        if (message === void 0) { message = ''; }
        this.type = type;
        this.title = title;
        this.message = message;
    }
    return ResponseMessage;
}());
exports.ResponseMessage = ResponseMessage;
//# sourceMappingURL=response-message.js.map