"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_helpers_1 = require("../../app.helpers");
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
        if (entityIndex < 0) {
            throw new Error('The entity with id, [' + entityId + '], ' +
                'does not exist!');
        }
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
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base-entity.js.map