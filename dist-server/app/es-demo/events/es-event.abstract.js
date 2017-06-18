"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verification_output_1 = require("../types/verification-output");
var app_helpers_1 = require("../../app.helpers");
var EsEvent = (function () {
    function EsEvent(rootModel, name, parent) {
        if (parent === void 0) { parent = null; }
        this.rootModel = rootModel;
        this.name = name;
        this.parent = parent;
    }
    EsEvent.prototype.throwIfVerificationFails = function () {
        var results = this.verifyProcess();
        var combinedResults = this.combineAllVerifications(results);
        if (combinedResults.passed === false) {
            throw new Error(combinedResults.failedMessage);
        }
    };
    EsEvent.prototype.combineAllVerifications = function (verifications) {
        var result = new verification_output_1.VerificationOutput();
        result.failedMessage = 'The following verification(s) failed and was not handled:\n';
        for (var _i = 0, verifications_1 = verifications; _i < verifications_1.length; _i++) {
            var verification = verifications_1[_i];
            if (verification.passed === false) {
                result.failedMessage = verification.failedMessage + '\n';
                result.passed = false;
            }
        }
        return result;
    };
    EsEvent.prototype.ifEmptyGenerateUUID = function (id) {
        var returnId;
        if (this.checkIfValidBasicValue(id, 'ID').passed === false) {
            returnId = app_helpers_1.generateUUID();
        }
        else {
            returnId = id;
        }
        return returnId;
    };
    EsEvent.prototype.checkIfValidBasicValue = function (value, propertyName) {
        var result = new verification_output_1.VerificationOutput();
        if (value === null || typeof value === 'undefined') {
            result.passed = false;
            result.failedMessage = "The property named, " + propertyName + ", cannot be undefined!";
        }
        else if (typeof value === 'string' && value === '') {
            result.passed = false;
            result.failedMessage = "The string value cannot be empty!";
        }
        return result;
    };
    EsEvent.prototype.checkIfIdExists = function (newId, existingId, idType) {
        var result = new verification_output_1.VerificationOutput();
        if (existingId < 0) {
            result.passed = false;
            result.failedMessage = "The " + idType + ", " + newId + ", does not exist!";
            return result;
        }
        return result;
    };
    return EsEvent;
}());
exports.EsEvent = EsEvent;
//# sourceMappingURL=es-event.abstract.js.map