"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EsEvent = (function () {
    function EsEvent(rootModel, name, parent) {
        if (parent === void 0) { parent = null; }
        this.rootModel = rootModel;
        this.name = name;
        this.parent = parent;
    }
    EsEvent.prototype.throwIfVerificationFails = function () {
        var results = this.verifyProcess();
        var resultOutput = 'The following verification(s) failed and was not handled:\n';
        var allPassed = true;
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var result = results_1[_i];
            if (result.passed === false) {
                resultOutput = result.failedMessage + '\n';
                allPassed = false;
            }
        }
        if (allPassed === false) {
            throw new Error(resultOutput);
        }
    };
    return EsEvent;
}());
exports.EsEvent = EsEvent;
//# sourceMappingURL=es-event.abstract.js.map