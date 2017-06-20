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
var es_event_abstract_1 = require("./es-event.abstract");
var verification_output_1 = require("../types/verification-output");
var EsModificationEvent = (function (_super) {
    __extends(EsModificationEvent, _super);
    function EsModificationEvent(rootModel, keys, values, name) {
        var _this = _super.call(this, rootModel, name) || this;
        _this.keys = keys;
        _this.values = values;
        return _this;
    }
    EsModificationEvent.prototype.applyModifications = function (entity) {
        var _this = this;
        this.keys.forEach(function (keyItem, index) {
            if (entity.hasOwnProperty(keyItem)) {
                entity[keyItem] = _this.values[index];
            }
            else {
                throw new Error('The property, ' + keyItem + ', does not exist!');
            }
        });
    };
    // 1. Make sure the propose name and ID modifications don't conflict with existing
    EsModificationEvent.prototype.verifyNameIdConflicts = function (entities) {
        var result = new verification_output_1.VerificationOutput();
        for (var i = 0; i < this.keys.length; i++) {
            if (this.keys[i].endsWith('name') && this.keys[i] !== 'name') {
                var newName = this.values[i];
                // Traverse through all the entities
                for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
                    var entity = entities_1[_i];
                    var propertyName = this.keys[i];
                    // Does it already have the same name?
                    if (entity[propertyName] === this.values[i]) {
                        result.passed = false;
                        result.failedMessage = 'The proposed name change conflicts with another ' +
                            'existing entity of the same type!';
                        break;
                    }
                }
            }
        }
        return result;
    };
    EsModificationEvent.prototype.verifyKeysAndValues = function (entity) {
        var result = new verification_output_1.VerificationOutput();
        for (var index = 0; index < this.keys.length; index++) {
            if (entity.hasOwnProperty(this.keys[index]) === false) {
                result.passed = false;
                result.failedMessage = "Invalid command - the property, " + this.keys[index] + ", does not exist!";
                break;
            }
            else if (typeof entity[this.keys[index]] === 'number') {
                var testParseInt = parseInt(entity[this.keys[index]], 10);
                if (testParseInt === NaN) {
                    result.passed = false;
                    result.failedMessage = "Invalid command - the numerical property,             " + this.keys[index] + ", expects a number for instead got,             " + this.values[index];
                    break;
                }
            }
        }
        return result;
    };
    return EsModificationEvent;
}(es_event_abstract_1.EsEvent));
exports.EsModificationEvent = EsModificationEvent;
//# sourceMappingURL=es-modification-event.js.map