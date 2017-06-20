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
var base_entity_1 = require("./base-entity");
var RootModel = (function (_super) {
    __extends(RootModel, _super);
    function RootModel(name, id, eventId, transponders, customers, originators) {
        if (id === void 0) { id = null; }
        if (eventId === void 0) { eventId = null; }
        if (transponders === void 0) { transponders = []; }
        if (customers === void 0) { customers = []; }
        if (originators === void 0) { originators = []; }
        var _this = _super.call(this, name, id) || this;
        _this.eventId = eventId;
        _this.transponders = transponders;
        _this.customers = customers;
        _this.originators = originators;
        return _this;
    }
    // public copyPropertiesTo(externalRootModel: RootModel) {
    //   for (const keyName in )
    // }
    /**************** Transponder **********************/
    RootModel.prototype.addTransponder = function (newTransponder) {
        this.addEntity(newTransponder, this.transponders);
    };
    RootModel.prototype.getTransponder = function (transponderId) {
        return this.getEntity(transponderId, this.transponders);
    };
    RootModel.prototype.getTransponderIndex = function (transponderId) {
        return this.getEntityIndex(transponderId, this.transponders);
    };
    RootModel.prototype.removeTransponder = function (transponderId) {
        this.removeEntity(transponderId, this.transponders);
    };
    /**************** Customers **********************/
    RootModel.prototype.addCustomer = function (newCustomer) {
        this.addEntity(newCustomer, this.customers);
    };
    RootModel.prototype.getCustomer = function (customerId) {
        return this.getEntity(customerId, this.customers);
    };
    RootModel.prototype.getCustomerIndex = function (customerId) {
        return this.getEntityIndex(customerId, this.customers);
    };
    RootModel.prototype.removeCustomer = function (customerId) {
        this.removeEntity(customerId, this.customers);
    };
    /**************** Originators **********************/
    RootModel.prototype.addOriginator = function (newOriginator) {
        this.addEntity(newOriginator, this.originators);
    };
    RootModel.prototype.getOriginator = function (originatorId) {
        return this.getEntity(originatorId, this.originators);
    };
    RootModel.prototype.getOriginatorIndex = function (originatorId) {
        return this.getEntityIndex(originatorId, this.originators);
    };
    RootModel.prototype.removeOriginator = function (originatorId) {
        this.removeEntity(originatorId, this.originators);
    };
    return RootModel;
}(base_entity_1.BaseEntity));
exports.RootModel = RootModel;
//# sourceMappingURL=root-model.js.map