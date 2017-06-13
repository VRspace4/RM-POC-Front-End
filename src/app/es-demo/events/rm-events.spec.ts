import {RootModel} from "../models/root-model";
import {Transponder} from "../models/transponder";
import {CustomerAddedEvent} from "./customer-added-event";
import {Customer} from "../models/customer";
import {CustomerModifiedEvent} from "./customer-modified-event";
import {TransponderAddedEvent} from "./transponder-added-event";
import {TransponderModifiedEvent} from "./transponder-modified-event";
import {Originator} from "../models/originator";
import {AllocationAddedEvent} from "./allocation-added-event";
import {RmEventType} from "../../app.globals";
//
describe('RM Events', () => {
  let rootModel: RootModel;

  beforeEach(() => {
    const transponder = new Transponder('Transponder 1');
    rootModel = new RootModel('Production');
    rootModel.addTransponder(transponder);
  });

  describe(RmEventType[RmEventType.TransponderAddedEvent], () => {
    it('process() should add the transponder into the root model', function() {
      const transponderAddedEvent = new TransponderAddedEvent(rootModel, 'Transponder 2');
      rootModel = transponderAddedEvent.process();
      const matchedTransponder: Transponder = rootModel.getTransponder(transponderAddedEvent.transponderId);
      expect(matchedTransponder.name).toBe('Transponder 2');
      expect(matchedTransponder.id).toBeDefined();
    });
  });

  describe(RmEventType[RmEventType.TransponderModifiedEvent], () => {
    it('process() should modify ALL properties of the transponder.', function () {
      const transponder: Transponder = rootModel.transponders[0];
      const transponderModifiedEvent = new TransponderModifiedEvent(rootModel, transponder.id,
        ['name', 'id', 'powerLimit', 'bandwidth'], ['newName', 'newId', '111', '222']);
      transponderModifiedEvent.process();
      expect(transponder.name).toBe('newName');
      expect(transponder.id).toBe('newId');
      expect(transponder.powerLimit).toBe('111');
      expect(transponder.bandwidth).toBe('222');
    });
  });

   describe(RmEventType[RmEventType.AllocationAddedEvent], () => {
    it('process() should add allocation with properties from event payload into an existing transponder', function() {
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
  });

  describe(RmEventType[RmEventType.CustomerAddedEvent], () => {
    it('process() should add new customer with properties from event payload into an existing root model', function () {
      const customerAddedEvent = new CustomerAddedEvent(rootModel, 'Intelsat');
      customerAddedEvent.process();
      const customerAdded = rootModel.getCustomer(customerAddedEvent.customerId);
      expect(customerAdded.name).toBe(customerAddedEvent.customerName);
      expect(customerAdded.id).toBe(customerAddedEvent.customerId);
    });
  });

  describe(RmEventType[RmEventType.CustomerModifiedEvent], () => {
    it('process() should modify existing customer', function () {
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

    it('process() should throw an error, given a customer ID that does not exist', function () {
      expect(rootModel.customers.length).toBe(0);
      const customerId = 'id12345';
      const newCustomer = new Customer('Intelsat', customerId);
      rootModel.addCustomer(newCustomer);
      // Use a non-existing customer ID
      const customerModifiedEvent = new CustomerModifiedEvent(rootModel,
        'diffId', ['name', 'id'], ['NameChanged', 'KeyChanged']);

      expect(function () {
        customerModifiedEvent.process();
      })
        .toThrowError();
    });
  });

});
