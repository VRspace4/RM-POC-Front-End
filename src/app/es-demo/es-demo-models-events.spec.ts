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

describe('es-demo-models-events-services', () => {
  let transponder: Transponder;

  beforeEach(() => {
    transponder = new Transponder('Transponder 1');
  });

  it('[Model] Transponder - Basic', function() {
    expect(transponder.name).toBe('Transponder 1');
  });

  it('[Event] TransponderAddedEvent - Process()', function() {
    expect(transponder.name).toBe('Transponder 1');
    const transponderAddedEvent = new TransponderAddedEvent('Transponder 2');
    transponder = transponderAddedEvent.process();
    expect(transponder.name).toBe('Transponder 2');
    expect(transponder.id).toBeDefined();
  });

  it('[Event] TransponderModifiedEvent - Process()', function() {
    const transponderModifiedEvent = new TransponderModifiedEvent(transponder,
      ['name', 'id', 'powerLimit', 'bandwidth'], ['newName', 'newId', '111', '222']);
    transponderModifiedEvent.process();
    expect(transponder.name).toBe('newName');
    expect(transponder.id).toBe('newId');
    expect(transponder.powerLimit).toBe('111');
    expect(transponder.bandwidth).toBe('222');
  });

  it('[Event] AllocationAddedEvent - Process() (Basic)', function() {
    const newOriginator = new Originator('James Pham');

    const allocationAddedEvent = new AllocationAddedEvent(transponder,
      5, 10, 15, newOriginator.id, 'Allocation 1');
    allocationAddedEvent.process();

    expect(transponder.allocations.length).toBe(1);
    expect(transponder.allocations[0].originatorId).toBe(newOriginator.id);
    expect(transponder.allocations[0].powerUsage).toBe(15);
    expect(transponder.allocations[0].startFrequency).toBe(5);
    expect(transponder.allocations[0].stopFrequency).toBe(10);
    expect(transponder.allocations[0].name).toBe('Allocation 1');
  });

  it('[Event] CustomerAddedEvent - Process()', function() {
    const customerAddedEvent = new CustomerAddedEvent(transponder, 'Intelsat');
    customerAddedEvent.process();
    expect(transponder.getCustomer(customerAddedEvent.id).name).toBe(customerAddedEvent.name);
  });

  it('[Event] CustomerModifiedEvent - Process()', function() {
    expect(transponder.customers.length).toBe(0);
    const customerId = 'id12345';
    const newCustomer = new Customer('Intelsat', customerId);
    transponder.addCustomer(newCustomer);
    const customerModifiedEvent = new CustomerModifiedEvent(transponder,
      customerId, ['name', 'id'], ['NameChanged', 'KeyChanged']);
    customerModifiedEvent.process();

    expect(transponder.customers.length).toBe(1);
    expect(transponder.customers[0].id).toBe('KeyChanged');
    expect(transponder.customers[0].name).toBe('NameChanged');
  });

  it('[Event] CustomerModifiedEvent - Process(), should throw an error', function() {
    expect(transponder.customers.length).toBe(0);
    const customerId = 'id12345';
    const newCustomer = new Customer('Intelsat', customerId);
    transponder.addCustomer(newCustomer);
    // Use a non-existing customer ID
    const customerModifiedEvent = new CustomerModifiedEvent(transponder,
      'diffId', ['name', 'id'], ['NameChanged', 'KeyChanged']);

    expect(function() {customerModifiedEvent.process()})
      .toThrowError('The customer to be modified with id, diffId, does not exist!');
  });

  it('[Service] TransponderService - runAllNewAllocationVerifications(), should pass', function() {
    const newOriginator = new Originator('James Pham');
    const allocation1 = new Allocation(0, 10, 15, newOriginator.id, 'Allocation 1');
    const allocation2 = new Allocation(20, 30, 15, newOriginator.id, 'Allocation 2');
    const allocation3 = new Allocation(31, 40, 15, newOriginator.id, 'Allocation 3');
    const newAllocation = new Allocation(15, 17, 15, newOriginator.id, 'New Allocation');

    transponder.addAllocation(allocation1);
    transponder.addAllocation(allocation2);
    transponder.addAllocation(allocation3);

    const verifyResult: boolean = TransponderService.runAllNewAllocationVerifications(transponder.allocations, newAllocation);
    expect(verifyResult).toBe(true);
  });

  it('[Service] TransponderService - confirmAllocationHasNoConflict(), should pass', function() {
    const newOriginator = new Originator('James Pham');
    const allocation1 = new Allocation(0, 10, 15, newOriginator.id, 'Allocation 1');
    const allocation2 = new Allocation(20, 30, 15, newOriginator.id, 'Allocation 2');
    const allocation3 = new Allocation(31, 40, 15, newOriginator.id, 'Allocation 3');
    const newAllocation = new Allocation(15, 19, 15, newOriginator.id, 'New Allocation');

    transponder.addAllocation(allocation1);
    transponder.addAllocation(allocation2);
    transponder.addAllocation(allocation3);

    const verifyResult: boolean = TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
    expect(verifyResult).toBe(true);
  });

  it('[Service] TransponderService - confirmAllocationHasNoConflict(), should throw an error, lower bound', function() {
    const newOriginator = new Originator('James Pham');
    const allocation1 = new Allocation(0, 10, 15, newOriginator.id, 'Allocation 1');
    const allocation2 = new Allocation(20, 30, 15, newOriginator.id, 'Allocation 2');
    const allocation3 = new Allocation(31, 40, 15, newOriginator.id, 'Allocation 3');
    const newAllocation = new Allocation(5, 19, 15, newOriginator.id, 'New Allocation');

    transponder.addAllocation(allocation1);
    transponder.addAllocation(allocation2);
    transponder.addAllocation(allocation3);

    expect(function() {
      TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
    }).toThrowError();
  });

  it('[Service] TransponderService - confirmAllocationHasNoConflict(), should throw an error, upper bound', function() {
    const newOriginator = new Originator('James Pham');
    const allocation1 = new Allocation(0, 10, 15, newOriginator.id, 'Allocation 1');
    const allocation2 = new Allocation(20, 30, 15, newOriginator.id, 'Allocation 2');
    const allocation3 = new Allocation(31, 40, 15, newOriginator.id, 'Allocation 3');
    const newAllocation = new Allocation(15, 25, 15, newOriginator.id, 'New Allocation');

    transponder.addAllocation(allocation1);
    transponder.addAllocation(allocation2);
    transponder.addAllocation(allocation3);

    expect(function() {
      TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
    }).toThrowError();
  });

  it('[Service] TransponderService - verifyAllocationFrequency(), should return true', function() {
    const newOriginator = new Originator('James Pham');
    const newAllocation = new Allocation(10, 20, 15, newOriginator.id, 'New Allocation 1');

    const result: boolean = TransponderService.verifyAllocationFrequency(newAllocation);
    expect(result).toBe(true);
  });

  it('[Service] TransponderService - verifyAllocationFrequency(), should throw an error', function() {
    const newOriginator = new Originator('James Pham');
    const newAllocation = new Allocation(30, 20, 15, newOriginator.id, 'New Allocation');

    expect(function() {
      TransponderService.verifyAllocationFrequency(newAllocation);
    }).toThrowError();
  });
});
