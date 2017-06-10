import {Transponder} from "../models/transponder";
import {Allocation} from "../models/allocation";
import {TransponderService} from "./transponder.service";

describe('[es-demo-services.spec.ts] TransponderService class', () => {
  /**
   *
   */
  describe('confirmAllocationHasNoConflict()', () => {
    let allocations: Allocation[];

    beforeEach(() => {
      const allocation1 = new Allocation(0, 10, 15, 'Customer1', 'JP1', 'Allocation 1');
      const allocation2 = new Allocation(11, 19, 15, 'Customer1', 'JP1', 'Allocation 2');
      allocations = [allocation1, allocation2];
    });

    it('given new and non conflicting allocation to be added, should pass', function() {
      const newAllocation = new Allocation(20, 25, 15, 'Customer1', 'JP1', 'New Allocation');
      expect(function() {
        TransponderService.confirmAllocationHasNoConflict(allocations, newAllocation)
      }).toBeTruthy();
    });

    it('given new and conflicting allocation to be added, should throw error', function() {
      const newAllocation = new Allocation(15, 25, 15, 'Customer1', 'JP1', 'New Allocation');
      expect(function() {
        TransponderService.confirmAllocationHasNoConflict(allocations, newAllocation)
      }).toThrowError();
    });
  });

  /**
   *
   */
  describe('verifyAllocationFrequency()', () => {
    let allocations: Allocation[];

    beforeEach(() => {
      const allocation1 = new Allocation(0, 10, 15, 'Customer1', 'JP1', 'Allocation 1');
      const allocation2 = new Allocation(11, 19, 15, 'Customer1', 'JP1', 'Allocation 2');
      allocations = [allocation1, allocation2];
    });

    it('given a non conflicting allocation, should pass', function() {
      const newAllocation = new Allocation(20, 25, 15, 'Customer1', 'JP1', 'New Allocation');
      expect(TransponderService.verifyAllocationFrequency(newAllocation))
        .toBeTruthy();
    });

    it('given allocation with start frequency larger than stop frequency, should throw error', function() {
      const newAllocation = new Allocation(36, 25, 15, 'Customer1', 'JP1', 'New Allocation');
      expect(function() {
        TransponderService.verifyAllocationFrequency(newAllocation)
      }).toThrowError();
    });
  });

  /**
   *
   */
  describe('runAllNewAllocationVerifications()', () => {
    let allocations: Allocation[];

    beforeEach(() => {
      const allocation1 = new Allocation(0, 10, 15, 'Customer1', 'JP1', 'Allocation 1');
      const allocation2 = new Allocation(11, 19, 15, 'Customer1', 'JP1', 'Allocation 2');
      allocations = [allocation1, allocation2];
    });

    it('given new and non conflicting allocation to be added, should pass', function() {
      const newAllocation = new Allocation(20, 25, 15, 'Customer1', 'JP1', 'New Allocation');
      expect(function() {
        TransponderService.runAllNewAllocationVerifications(allocations, newAllocation)
      }).toBeTruthy();
    });

    it('given new and conflicting allocation to be added, should throw error', function() {
      const newAllocation = new Allocation(15, 25, 15, 'Customer1', 'JP1', 'New Allocation');
      expect(function() {
        TransponderService.runAllNewAllocationVerifications(allocations, newAllocation)
      }).toThrowError();
    });
  });
});
