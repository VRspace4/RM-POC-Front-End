"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VerificationOutput = (function () {
    function VerificationOutput(passed, failedMessage) {
        if (passed === void 0) { passed = true; }
        if (failedMessage === void 0) { failedMessage = ''; }
        this.passed = passed;
        this.failedMessage = failedMessage;
    }
    return VerificationOutput;
}());
exports.VerificationOutput = VerificationOutput;
//# sourceMappingURL=verification-output.js.map