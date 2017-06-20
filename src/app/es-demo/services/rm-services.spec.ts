import {Transponder} from "../models/transponder";
import {TransponderAddedEvent} from "../events/transponder-added-event";
import {RmEventType} from "../../app.globals";
import {RootModel} from "../models/root-model";
import {TransponderService} from "./transponder.service";
import {Allocation} from "../models/allocation";


describe('RM Services', () => {
  let rootModel: RootModel;

  beforeEach(() => {
    const transponder = new Transponder('Transponder 1');
    rootModel = new RootModel('Production');
    rootModel.addTransponder(transponder);
  });

  describe(RmEventType[RmEventType.TransponderAddedEvent], () => {
    it('process() should add the transponder into the root model', function () {
      const transponderAddedEvent = new TransponderAddedEvent(rootModel, 'Transponder 2');
      rootModel = transponderAddedEvent.process();
      const matchedTransponder: Transponder = rootModel.getTransponder(transponderAddedEvent.transponderId);
      expect(matchedTransponder.name).toBe('Transponder 2');
      expect(matchedTransponder.id).toBeDefined();
    });
  });

  describe('Transponder services', () => {
    let transponder: Transponder;
    beforeEach(() => {
      const allocation1 = new Allocation(0, 10, 15, 'Customer1', 'JP1', 'Allocation 1');
      const allocation2 = new Allocation(20, 30, 15, 'Customer1', 'JP1', 'Allocation 2');
      const allocation3 = new Allocation(31, 40, 15, 'Customer1', 'JP1', 'Allocation 3');
      transponder = rootModel.transponders[0];
      transponder.addAllocation(allocation1);
      transponder.addAllocation(allocation2);
      transponder.addAllocation(allocation3);
    });

    it('[Service] TransponderService - runAllNewAllocationVerifications(), should pass', function() {
      const newAllocation = new Allocation(15, 17, 15, 'Customer1', 'JP1', 'New Allocation');

      const results = TransponderService.runAllNewAllocationVerifications(rootModel.transponders[0].powerLimit,
        transponder.allocations, newAllocation);

      let  passed: boolean = true;
      for (const result of results) {
        passed = passed && result.passed;
      }
      expect(passed).toBe(true);
    });

    it('[Service] TransponderService - confirmAllocationHasNoConflict(), should pass', function() {
      const newAllocation = new Allocation(15, 19, 15, 'Customer1', 'JP1', 'New Allocation');

      const result  = TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);

      expect(result.passed).toBe(true);
    });

    it('[Service] TransponderService - confirmAllocationHasNoConflict(), should fail because of lower bound conflict', function() {
      const newAllocation = new Allocation(5, 19, 15,  'Customer1', 'JP1', 'New Allocation');

      const result  = TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);

      expect(result.passed).toBe(false);
    });

    it('[Service] TransponderService - confirmAllocationHasNoConflict(), should fail because of upper bound conflict', function() {
      const newAllocation = new Allocation(15, 25, 15,  'Customer1', 'JP1', 'New Allocation');

      const result  = TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);

      expect(result.passed).toBe(false);
    });

    it('[Service] TransponderService - verifyAllocationFrequency(), should return true', function() {
      const newAllocation = new Allocation(10, 20, 15, 'Customer1', 'JP1', 'New Allocation 1');

      const result = TransponderService.verifyAllocationFrequency(newAllocation);

      expect(result.passed).toBe(true);
    });

    it('[Service] TransponderService - verifyAllocationFrequency(), should fail', function() {
      const newAllocation = new Allocation(30, 20, 15, 'Customer1', 'JP1', 'New Allocation');

      const result = TransponderService.verifyAllocationFrequency(newAllocation);

      expect(result.passed).toBe(false);
    });
  });
});
