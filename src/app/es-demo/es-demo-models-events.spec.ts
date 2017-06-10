import {Transponder} from "./models/transponder";
import {CustomerModifiedEvent} from "./events/customer-modified-event";
import {CustomerAddedEvent} from "./events/customer-added-event";
import {Customer} from "./models/customer";
import {TransponderAddedEvent} from "./events/transponder-added-event";
import {TransponderModifiedEvent} from "./events/transponder-modified-event";
import {AllocationAddedEvent} from "./events/allocation-added-event";
import {Originator} from "./models/originator";
import {Allocation} from "./models/allocation";
import {TransponderService} from "./services/transponder.service";
import {RootModel} from "./models/root-model";

describe('es-demo-models-events-services', () => {
  let rootModel: RootModel;

  beforeEach(() => {
    const transponder = new Transponder('Transponder 1');
    rootModel = new RootModel('Production');
    rootModel.addTransponder(transponder);
  });

  it('[Model] Transponder - Basic', function() {
    expect(rootModel.transponders[0].name).toBe('Transponder 1');
  });

  it('[Event] TransponderAddedEvent - Process()', function() {
    const transponderAddedEvent = new TransponderAddedEvent(rootModel, 'Transponder 2');
    rootModel = transponderAddedEvent.process();
    const matchedTransponder: Transponder = rootModel.getTransponder(transponderAddedEvent.transponderId);
    expect(matchedTransponder.name).toBe('Transponder 2');
    expect(matchedTransponder.id).toBeDefined();
  });

  it('[Event] TransponderModifiedEvent - Process()', function() {
    const transponder: Transponder = rootModel.transponders[0];
    const transponderModifiedEvent = new TransponderModifiedEvent(rootModel, transponder.id,
      ['name', 'id', 'powerLimit', 'bandwidth'], ['newName', 'newId', '111', '222']);
    transponderModifiedEvent.process();
    expect(transponder.name).toBe('newName');
    expect(transponder.id).toBe('newId');
    expect(transponder.powerLimit).toBe('111');
    expect(transponder.bandwidth).toBe('222');
  });

  it('[Event] AllocationAddedEvent - Process() (Basic)', function() {
    const newOriginator = new Originator('James Pham');
    const transponder = rootModel.transponders[0];
    const allocationAddedEvent = new AllocationAddedEvent(rootModel,
      transponder.id, 5, 10, 15, 'Customer1', newOriginator.id, 'Allocation 1');
    allocationAddedEvent.process();

    expect(transponder.allocations.length).toBe(1);
    expect(transponder.allocations[0].originatorId).toBe(newOriginator.id);
    expect(transponder.allocations[0].powerUsage).toBe(15);
    expect(transponder.allocations[0].startFrequency).toBe(5);
    expect(transponder.allocations[0].stopFrequency).toBe(10);
    expect(transponder.allocations[0].name).toBe('Allocation 1');
  });

  it('[Event] CustomerAddedEvent - Process()', function() {
    const customerAddedEvent = new CustomerAddedEvent(rootModel, 'Intelsat');
    customerAddedEvent.process();
    expect(rootModel.getCustomer(customerAddedEvent.customerId).name).toBe(customerAddedEvent.customerName);
  });

  it('[Event] CustomerModifiedEvent - Process()', function() {
    expect(rootModel.customers.length).toBe(0);
    const customerId = 'id12345';
    const newCustomer = new Customer('Intelsat', customerId);
    rootModel.addCustomer(newCustomer);
    const customerModifiedEvent = new CustomerModifiedEvent(rootModel,
      customerId, ['name', 'id'], ['NameChanged', 'KeyChanged']);
    customerModifiedEvent.process();

    expect(rootModel.customers.length).toBe(1);
    expect(rootModel.customers[0].id).toBe('KeyChanged');
    expect(rootModel.customers[0].name).toBe('NameChanged');
  });

  it('[Event] CustomerModifiedEvent - Process(), should throw an error', function() {
    expect(rootModel.customers.length).toBe(0);
    const customerId = 'id12345';
    const newCustomer = new Customer('Intelsat', customerId);
    rootModel.addCustomer(newCustomer);
    // Use a non-existing customer ID
    const customerModifiedEvent = new CustomerModifiedEvent(rootModel,
      'diffId', ['name', 'id'], ['NameChanged', 'KeyChanged']);

    expect(function() {
      customerModifiedEvent.process();
    })
      .toThrowError();
  });

  describe('Es-demo services', () => {
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

        const verifyResult: boolean = TransponderService.runAllNewAllocationVerifications(transponder.allocations, newAllocation);
        expect(verifyResult).toBe(true);
      });

      it('[Service] TransponderService - confirmAllocationHasNoConflict(), should pass', function() {
        const newAllocation = new Allocation(15, 19, 15, 'Customer1', 'JP1', 'New Allocation');

        const verifyResult: boolean = TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
        expect(verifyResult).toBe(true);
      });

      it('[Service] TransponderService - confirmAllocationHasNoConflict(), should throw an error, lower bound', function() {
        const newAllocation = new Allocation(5, 19, 15,  'Customer1', 'JP1', 'New Allocation');

        expect(function() {
          TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
        }).toThrowError();
      });

      it('[Service] TransponderService - confirmAllocationHasNoConflict(), should throw an error, upper bound', function() {
        const newAllocation = new Allocation(15, 25, 15,  'Customer1', 'JP1', 'New Allocation');

        expect(function() {
          TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
        }).toThrowError();
      });

      it('[Service] TransponderService - verifyAllocationFrequency(), should return true', function() {
        const newAllocation = new Allocation(10, 20, 15, 'Customer1', 'JP1', 'New Allocation 1');

        const result: boolean = TransponderService.verifyAllocationFrequency(newAllocation);
        expect(result).toBe(true);
      });

      it('[Service] TransponderService - verifyAllocationFrequency(), should throw an error', function() {
        const newAllocation = new Allocation(30, 20, 15, 'Customer1', 'JP1', 'New Allocation');

        expect(function() {
          TransponderService.verifyAllocationFrequency(newAllocation);
        }).toThrowError();
      });
    });
  });
});
