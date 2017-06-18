"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_helpers_1 = require("../../app.helpers");
var verification_output_1 = require("../types/verification-output");
var BaseEntity = (function () {
    function BaseEntity(name, id) {
        this.name = name;
        if (id === null || id === '') {
            this.id = app_helpers_1.generateUUID();
        }
        else {
            this.id = id;
        }
    }
    BaseEntity.prototype.copyPropertiesTo = function (entity) {
        var result = new verification_output_1.VerificationOutput();
        var commonFailString = "Attempting to copy properties over failed.";
        if (entity === null || typeof entity === 'undefined') {
            result.passed = false;
            result.failedMessage = commonFailString + "The entity cannot be undefined or null!";
            return result;
        }
        var keyName;
        // Make sure the two entities are of the same kind
        for (keyName in this) {
            if (typeof this[keyName.toString()] !== 'function') {
                if (!entity.hasOwnProperty(keyName)) {
                    result.passed = false;
                    result.failedMessage = commonFailString + ("The property named, " + keyName + ", doesn't exist!");
                    return result;
                }
            }
        }
        // Finally make the copy
        for (keyName in this) {
            if (typeof this[keyName.toString()] !== 'function') {
                if (entity.hasOwnProperty(keyName)) {
                    entity[keyName.toString()] = this[keyName.toString()];
                }
            }
        }
        return result;
    };
    // TODO To test
    BaseEntity.prototype.getEntity = function (entityId, entities) {
        var matchedEntity = entities
            .find(function (entity) { return entity.id === entityId; });
        if (matchedEntity === null) {
            throw new Error('The entity with the name and id, [' + entityId + '], ' +
                'does not exist!');
        }
        return matchedEntity;
    };
    BaseEntity.prototype.getEntityIndex = function (entityId, entities) {
        var entityIndex = entities
            .findIndex(function (entity) { return entity.id === entityId; });
        // if (entityIndex < 0) {
        //   throw new Error('The entity with id, [' + entityId + '], ' +
        //     'does not exist!');
        // }
        return entityIndex;
    };
    BaseEntity.prototype.addEntity = function (newEntity, entities) {
        entities.push(newEntity);
    };
    BaseEntity.prototype.removeEntity = function (entityId, entities) {
        var entityIndex = this.getEntityIndex(entityId, entities);
        if (entityIndex >= 0) {
            entities.splice(entityIndex, 1);
        }
    };
    BaseEntity.prototype.verifyEntityNameDuplication = function (rootModel, entities) {
        var result = new verification_output_1.VerificationOutput();
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var entity = entities_1[_i];
            if (this.name === entity.name) {
                result.passed = false;
                result.failedMessage = "There's already an entity with the same name, " + entity.name + ". Please choose another name.";
                break;
            }
        }
        return result;
    };
    BaseEntity.prototype.verifyEntityIdDuplication = function (rootModel, entities) {
        var result = new verification_output_1.VerificationOutput();
        for (var _i = 0, entities_2 = entities; _i < entities_2.length; _i++) {
            var entity = entities_2[_i];
            if (this.id === entity.id) {
                result.passed = false;
                result.failedMessage = "There's already an entity with the same ID, " + entity.id + "!";
                break;
            }
        }
        return result;
    };
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base-entity.js.map