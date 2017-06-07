"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransponderService = (function () {
    function TransponderService() {
    }
    TransponderService.verifyAllocation = function (allocations, newAllocation) {
        if (newAllocation.startFrequency > newAllocation.stopFrequency) {
            return false;
        }
        var result = true;
        allocations.forEach(function (allocation) {
            if ((newAllocation.startFrequency > allocation.startFrequency &&
                newAllocation.startFrequency < allocation.stopFrequency) ||
                (newAllocation.stopFrequency > allocation.startFrequency &&
                    newAllocation.stopFrequency < allocation.stopFrequency)) {
                result = false;
            }
        });
        return result;
    };
    return TransponderService;
}());
exports.TransponderService = TransponderService;
//# sourceMappingURL=transponder.service.js.map