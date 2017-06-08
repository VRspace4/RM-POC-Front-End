"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransponderService = (function () {
    function TransponderService() {
    }
    /**
     * Run all allocation verification functions
     * @param allocations
     * @param newAllocation
     * @returns {boolean} true if pass, otherwise an error will be thrown
     */
    TransponderService.runAllNewAllocationVerifications = function (allocations, newAllocation) {
        this.verifyAllocationFrequency(newAllocation);
        this.confirmAllocationHasNoConflict(allocations, newAllocation);
        return true;
    };
    /**
     * Confirms that the allocation start and stop frequency does not conflict with existing allocations
     * @param existingAllocations
     * @param newAllocation
     * @returns {boolean} true if pass, otherwise an error will be thrown
     */
    TransponderService.confirmAllocationHasNoConflict = function (existingAllocations, newAllocation) {
        existingAllocations.forEach(function (allocation) {
            if ((newAllocation.startFrequency > allocation.startFrequency &&
                newAllocation.startFrequency < allocation.stopFrequency) ||
                (newAllocation.stopFrequency > allocation.startFrequency &&
                    newAllocation.stopFrequency < allocation.stopFrequency)) {
                throw (new Error("Proposed allocation conflicts with existing allocation with ID of [" +
                    allocation.id + "]."));
            }
        });
        return true;
    };
    /**
     * Verifies that allocation's start frequency isn't greater than stop frequency.
     * @param newAllocation
     * @returns {boolean} true if pass, otherwise an error will be thrown
     */
    TransponderService.verifyAllocationFrequency = function (newAllocation) {
        if (newAllocation.startFrequency > newAllocation.stopFrequency) {
            throw (new Error("Allocation's start frequency, [" + newAllocation.startFrequency +
                "], should not be greater than stop frequency, [" + newAllocation.stopFrequency + "]."));
        }
        else {
            return true;
        }
    };
    return TransponderService;
}());
exports.TransponderService = TransponderService;
//# sourceMappingURL=transponder.service.js.map