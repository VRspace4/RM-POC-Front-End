import {Allocation} from "../models/allocation";
export class TransponderService {
  static runAllNewAllocationVerifications(allocations: Allocation[], newAllocation: Allocation): boolean {
    let result: boolean;

    result = this.verifyAllocationFrequency(newAllocation);
    result = this.confirmAllocationHasNoConflict(allocations, newAllocation);

    return result;
  }

  /**
   * Confirms that the allocation start and stop frequency does not conflict with existing allocations
   * @param existingAllocations
   * @param newAllocation
   * @returns {boolean}
   */
  static confirmAllocationHasNoConflict(existingAllocations: Allocation[], newAllocation: Allocation): boolean {
    existingAllocations.forEach(function(allocation) {
      if ((newAllocation.startFrequency > allocation.startFrequency &&
        newAllocation.startFrequency < allocation.stopFrequency) ||
        (newAllocation.stopFrequency > allocation.startFrequency &&
        newAllocation.stopFrequency < allocation.stopFrequency)) {
          throw(new Error("Proposed allocation conflicts with existing allocation with ID of [" +
            allocation.id + "]."));
      }
    });
    return true;
  }

  /**
   * Verifies that allocation's start frequency isn't greater than stop frequency.
   * @param newAllocation
   * @returns {boolean}
   */
  static verifyAllocationFrequency(newAllocation: Allocation): boolean {
    if (newAllocation.startFrequency > newAllocation.stopFrequency) {
      throw(new Error("Allocation's start frequency, [" + newAllocation.startFrequency +
        "], should not be greater than stop frequency, [" + newAllocation.stopFrequency + "]."));
    } else {
      return true;
    }
  }
}
