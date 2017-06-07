"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource = (function () {
    function Resource(id, customerId, startFrequency, stopFrequency, powerUsage, originatorId) {
        this.id = id;
        this.customerId = customerId;
        this.startFrequency = startFrequency;
        this.stopFrequency = stopFrequency;
        this.powerUsage = powerUsage;
        this.originatorId = originatorId;
    }
    return Resource;
}());
exports.Resource = Resource;
//# sourceMappingURL=resource.js.map