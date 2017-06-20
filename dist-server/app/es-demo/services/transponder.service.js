"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verification_output_1 = require("../types/verification-output");
var TransponderService = (function () {
    function TransponderService() {
    }
    /**
     * Run all allocation verification functions
     * @param allocations
     * @param newAllocation
     * @returns {boolean} true if pass, otherwise an error will be thrown
     */
    TransponderService.runAllNewAllocationVerifications = function (powerLimit, allocations, newAllocation) {
        var result1 = this.verifyAllocationFrequency(newAllocation);
        var result2 = this.confirmAllocationHasNoConflict(allocations, newAllocation);
        var result3 = this.verifyPowerUsageWitihinLimits(powerLimit, allocations, newAllocation);
        var results = [
            result1, result2, result3
        ];
        // } catch (e) {
        //   console.error(e.message);
        //   return false;
        // };
        return results;
    };
    /**
     * Confirms that the allocation start and stop frequency does not conflict with existing allocations
     * @param existingAllocations
     * @param newAllocation
     * @returns {boolean} true if pass, otherwise an error will be thrown
     */
    TransponderService.confirmAllocationHasNoConflict = function (existingAllocations, newAllocation) {
        var result = new verification_output_1.VerificationOutput();
        existingAllocations.forEach(function (allocation) {
            var lowerBound = (newAllocation.startFrequency >= allocation.startFrequency &&
                newAllocation.startFrequency <= allocation.stopFrequency);
            var upperBound = newAllocation.stopFrequency >= allocation.startFrequency &&
                newAllocation.stopFrequency <= allocation.stopFrequency;
            if (lowerBound || upperBound) {
                result.passed = false;
                result.failedMessage = "Proposed allocation conflicts with existing allocation, [" +
                    allocation.name + ", " + allocation.id + "]";
            }
        });
        return result;
    };
    /**
     * Verifies that allocation's start frequency isn't greater than stop frequency.
     * @param newAllocation
     * @returns {boolean} true if pass, otherwise an error will be thrown
     */
    TransponderService.verifyAllocationFrequency = function (newAllocation) {
        var result = new verification_output_1.VerificationOutput();
        if (newAllocation.startFrequency > newAllocation.stopFrequency) {
            result.passed = false;
            result.failedMessage = "Allocation's start frequency, [" + newAllocation.startFrequency +
                "], should not be greater than stop frequency, [" + newAllocation.stopFrequency + "].";
        }
        return result;
    };
    TransponderService.verifyPowerUsageWitihinLimits = function (powerLimit, existingAllocations, newAllocation) {
        var totalPowerUsage = 0;
        var result = new verification_output_1.VerificationOutput();
        for (var _i = 0, existingAllocations_1 = existingAllocations; _i < existingAllocations_1.length; _i++) {
            var allocation = existingAllocations_1[_i];
            totalPowerUsage += allocation.powerUsage;
        }
        if ((newAllocation.powerUsage + totalPowerUsage) > powerLimit) {
            result.passed = false;
            result.failedMessage = 'Allocation power usage on top of existing allocations exceeds total power limit!';
        }
        return result;
    };
    return TransponderService;
}());
exports.TransponderService = TransponderService;
//# sourceMappingURL=transponder.service.js.map