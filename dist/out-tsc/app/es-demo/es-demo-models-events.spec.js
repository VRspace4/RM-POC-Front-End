"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transponder_1 = require("./models/transponder");
var customer_modified_event_1 = require("./events/customer-modified-event");
var customer_added_event_1 = require("./events/customer-added-event");
var customer_1 = require("./models/customer");
var transponder_added_event_1 = require("./events/transponder-added-event");
var transponder_modified_event_1 = require("./events/transponder-modified-event");
var allocation_added_event_1 = require("./events/allocation-added-event");
var originator_1 = require("./models/originator");
var allocation_1 = require("./models/allocation");
var transponder_service_1 = require("./services/transponder.service");
describe('es-demo-models-events-services', function () {
    var transponder;
    beforeEach(function () {
        transponder = new transponder_1.Transponder('Transponder 1');
    });
    it('[Model] Transponder - Basic', function () {
        expect(transponder.name).toBe('Transponder 1');
    });
    it('[Event] TransponderAddedEvent - Process()', function () {
        expect(transponder.name).toBe('Transponder 1');
        var transponderAddedEvent = new transponder_added_event_1.TransponderAddedEvent('Transponder 2');
        transponder = transponderAddedEvent.process();
        expect(transponder.name).toBe('Transponder 2');
        expect(transponder.id).toBeDefined();
    });
    it('[Event] TransponderModifiedEvent - Process()', function () {
        var transponderModifiedEvent = new transponder_modified_event_1.TransponderModifiedEvent(transponder, ['name', 'id', 'powerLimit', 'bandwidth'], ['newName', 'newId', '111', '222']);
        transponderModifiedEvent.process();
        expect(transponder.name).toBe('newName');
        expect(transponder.id).toBe('newId');
        expect(transponder.powerLimit).toBe('111');
        expect(transponder.bandwidth).toBe('222');
    });
    it('[Event] AllocationAddedEvent - Process() (Basic)', function () {
        var newOriginator = new originator_1.Originator('James Pham');
        var allocationAddedEvent = new allocation_added_event_1.AllocationAddedEvent(transponder, 5, 10, 15, newOriginator.id, 'Allocation 1');
        allocationAddedEvent.process();
        expect(transponder.allocations.length).toBe(1);
        expect(transponder.allocations[0].originatorId).toBe(newOriginator.id);
        expect(transponder.allocations[0].powerUsage).toBe(15);
        expect(transponder.allocations[0].startFrequency).toBe(5);
        expect(transponder.allocations[0].stopFrequency).toBe(10);
        expect(transponder.allocations[0].name).toBe('Allocation 1');
    });
    it('[Event] CustomerAddedEvent - Process()', function () {
        var customerAddedEvent = new customer_added_event_1.CustomerAddedEvent(transponder, 'Intelsat');
        customerAddedEvent.process();
        expect(transponder.getCustomer(customerAddedEvent.id).name).toBe(customerAddedEvent.name);
    });
    it('[Event] CustomerModifiedEvent - Process()', function () {
        expect(transponder.customers.length).toBe(0);
        var customerId = 'id12345';
        var newCustomer = new customer_1.Customer('Intelsat', customerId);
        transponder.addCustomer(newCustomer);
        var customerModifiedEvent = new customer_modified_event_1.CustomerModifiedEvent(transponder, customerId, ['name', 'id'], ['NameChanged', 'KeyChanged']);
        customerModifiedEvent.process();
        expect(transponder.customers.length).toBe(1);
        expect(transponder.customers[0].id).toBe('KeyChanged');
        expect(transponder.customers[0].name).toBe('NameChanged');
    });
    it('[Event] CustomerModifiedEvent - Process(), should throw an error', function () {
        expect(transponder.customers.length).toBe(0);
        var customerId = 'id12345';
        var newCustomer = new customer_1.Customer('Intelsat', customerId);
        transponder.addCustomer(newCustomer);
        // Use a non-existing customer ID
        var customerModifiedEvent = new customer_modified_event_1.CustomerModifiedEvent(transponder, 'diffId', ['name', 'id'], ['NameChanged', 'KeyChanged']);
        expect(function () { customerModifiedEvent.process(); })
            .toThrowError('The customer to be modified with id, diffId, does not exist!');
    });
    it('[Service] TransponderService - runAllNewAllocationVerifications(), should pass', function () {
        var newOriginator = new originator_1.Originator('James Pham');
        var allocation1 = new allocation_1.Allocation(0, 10, 15, newOriginator.id, 'Allocation 1');
        var allocation2 = new allocation_1.Allocation(20, 30, 15, newOriginator.id, 'Allocation 2');
        var allocation3 = new allocation_1.Allocation(31, 40, 15, newOriginator.id, 'Allocation 3');
        var newAllocation = new allocation_1.Allocation(15, 17, 15, newOriginator.id, 'New Allocation');
        transponder.addAllocation(allocation1);
        transponder.addAllocation(allocation2);
        transponder.addAllocation(allocation3);
        var verifyResult = transponder_service_1.TransponderService.runAllNewAllocationVerifications(transponder.allocations, newAllocation);
        expect(verifyResult).toBe(true);
    });
    it('[Service] TransponderService - confirmAllocationHasNoConflict(), should pass', function () {
        var newOriginator = new originator_1.Originator('James Pham');
        var allocation1 = new allocation_1.Allocation(0, 10, 15, newOriginator.id, 'Allocation 1');
        var allocation2 = new allocation_1.Allocation(20, 30, 15, newOriginator.id, 'Allocation 2');
        var allocation3 = new allocation_1.Allocation(31, 40, 15, newOriginator.id, 'Allocation 3');
        var newAllocation = new allocation_1.Allocation(15, 19, 15, newOriginator.id, 'New Allocation');
        transponder.addAllocation(allocation1);
        transponder.addAllocation(allocation2);
        transponder.addAllocation(allocation3);
        var verifyResult = transponder_service_1.TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
        expect(verifyResult).toBe(true);
    });
    it('[Service] TransponderService - confirmAllocationHasNoConflict(), should throw an error, lower bound', function () {
        var newOriginator = new originator_1.Originator('James Pham');
        var allocation1 = new allocation_1.Allocation(0, 10, 15, newOriginator.id, 'Allocation 1');
        var allocation2 = new allocation_1.Allocation(20, 30, 15, newOriginator.id, 'Allocation 2');
        var allocation3 = new allocation_1.Allocation(31, 40, 15, newOriginator.id, 'Allocation 3');
        var newAllocation = new allocation_1.Allocation(5, 19, 15, newOriginator.id, 'New Allocation');
        transponder.addAllocation(allocation1);
        transponder.addAllocation(allocation2);
        transponder.addAllocation(allocation3);
        expect(function () {
            transponder_service_1.TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
        }).toThrowError();
    });
    it('[Service] TransponderService - confirmAllocationHasNoConflict(), should throw an error, upper bound', function () {
        var newOriginator = new originator_1.Originator('James Pham');
        var allocation1 = new allocation_1.Allocation(0, 10, 15, newOriginator.id, 'Allocation 1');
        var allocation2 = new allocation_1.Allocation(20, 30, 15, newOriginator.id, 'Allocation 2');
        var allocation3 = new allocation_1.Allocation(31, 40, 15, newOriginator.id, 'Allocation 3');
        var newAllocation = new allocation_1.Allocation(15, 25, 15, newOriginator.id, 'New Allocation');
        transponder.addAllocation(allocation1);
        transponder.addAllocation(allocation2);
        transponder.addAllocation(allocation3);
        expect(function () {
            transponder_service_1.TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
        }).toThrowError();
    });
    it('[Service] TransponderService - verifyAllocationFrequency(), should return true', function () {
        var newOriginator = new originator_1.Originator('James Pham');
        var newAllocation = new allocation_1.Allocation(10, 20, 15, newOriginator.id, 'New Allocation 1');
        var result = transponder_service_1.TransponderService.verifyAllocationFrequency(newAllocation);
        expect(result).toBe(true);
    });
    it('[Service] TransponderService - verifyAllocationFrequency(), should throw an error', function () {
        var newOriginator = new originator_1.Originator('James Pham');
        var newAllocation = new allocation_1.Allocation(30, 20, 15, newOriginator.id, 'New Allocation');
        expect(function () {
            transponder_service_1.TransponderService.verifyAllocationFrequency(newAllocation);
        }).toThrowError();
    });
});
//# sourceMappingURL=es-demo-models-events.spec.js.map