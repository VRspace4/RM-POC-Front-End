import {Allocation} from "../models/allocation";
import {VerificationOutput} from "../types/verification-output";
export class TransponderService {
  /**
   * Run all allocation verification functions
   * @param allocations
   * @param newAllocation
   * @returns {boolean} true if pass, otherwise an error will be thrown
   */
  static runAllNewAllocationVerifications(powerLimit: number, allocations: Allocation[],
                                          newAllocation: Allocation): VerificationOutput[] {
    const result1 = this.verifyAllocationFrequency(newAllocation);
    const result2 = this.confirmAllocationHasNoConflict(allocations, newAllocation);
    const result3 = this.verifyPowerUsageWitihinLimits(powerLimit, allocations, newAllocation);

    const results: VerificationOutput[] = [
      result1, result2, result3
    ];
    // } catch (e) {
    //   console.error(e.message);
    //   return false;
    // };
    return results;
  }

  /**
   * Confirms that the allocation start and stop frequency does not conflict with existing allocations
   * @param existingAllocations
   * @param newAllocation
   * @returns {boolean} true if pass, otherwise an error will be thrown
   */
  static confirmAllocationHasNoConflict(existingAllocations: Allocation[], newAllocation: Allocation): VerificationOutput {
    const result = new VerificationOutput();
    existingAllocations.forEach(function(allocation) {
      const lowerBound = (newAllocation.startFrequency >= allocation.startFrequency &&
      newAllocation.startFrequency <= allocation.stopFrequency);
      const upperBound = newAllocation.stopFrequency >= allocation.startFrequency &&
        newAllocation.stopFrequency <= allocation.stopFrequency;
      if (lowerBound || upperBound) {
          result.passed = false;
          result.failedMessage = "Proposed allocation conflicts with existing allocation, [" +
            allocation.name + ", " + allocation.id + "]";
      }
    });
    return result;
  }

  /**
   * Verifies that allocation's start frequency isn't greater than stop frequency.
   * @param newAllocation
   * @returns {boolean} true if pass, otherwise an error will be thrown
   */
  static verifyAllocationFrequency(newAllocation: Allocation): VerificationOutput {
    const result = new VerificationOutput();
    if (newAllocation.startFrequency > newAllocation.stopFrequency) {
      result.passed = false;
      result.failedMessage = "Allocation's start frequency, [" + newAllocation.startFrequency +
      "], should not be greater than stop frequency, [" + newAllocation.stopFrequency + "].";
    }

    return result;
  }

  static verifyPowerUsageWitihinLimits(powerLimit: number, existingAllocations: Allocation[],
                                       newAllocation: Allocation): VerificationOutput {
    let totalPowerUsage = 0;
    const result = new VerificationOutput();

    for (const allocation of existingAllocations) {
      totalPowerUsage += allocation.powerUsage;
    }

    if ((newAllocation.powerUsage + totalPowerUsage) > powerLimit) {
      result.passed = false;
      result.failedMessage = 'Allocation power usage on top of existing allocations exceeds total power limit!';
    }
    return result;
  }
}
