"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_model_1 = require("../models/root-model");
var transponder_1 = require("../models/transponder");
var customer_added_event_1 = require("./customer-added-event");
var customer_1 = require("../models/customer");
var customer_modified_event_1 = require("./customer-modified-event");
var transponder_added_event_1 = require("./transponder-added-event");
var transponder_modified_event_1 = require("./transponder-modified-event");
var originator_1 = require("../models/originator");
var allocation_added_event_1 = require("./allocation-added-event");
var app_globals_1 = require("../../app.globals");
//
describe('RM Events', function () {
    var rootModel;
    beforeEach(function () {
        var transponder = new transponder_1.Transponder('Transponder 1');
        rootModel = new root_model_1.RootModel('Production');
        rootModel.addTransponder(transponder);
    });
    describe(app_globals_1.RmEventType[app_globals_1.RmEventType.TransponderAddedEvent], function () {
        it('process() should add the transponder into the root model', function () {
            var transponderAddedEvent = new transponder_added_event_1.TransponderAddedEvent(rootModel, 'Transponder 2');
            rootModel = transponderAddedEvent.process();
            var matchedTransponder = rootModel.getTransponder(transponderAddedEvent.transponderId);
            expect(matchedTransponder.name).toBe('Transponder 2');
            expect(matchedTransponder.id).toBeDefined();
        });
        it('verifyEvents() should pass, given the correct parameters', function () {
            var transponderAddedEvent = new transponder_added_event_1.TransponderAddedEvent(rootModel, 'Test Transponder 1');
            var result = transponderAddedEvent.verifyEvent();
            expect(result.passed).toBeTruthy();
        });
    });
    describe(app_globals_1.RmEventType[app_globals_1.RmEventType.TransponderModifiedEvent], function () {
        it('process() should modify ALL properties of the transponder.', function () {
            var transponder = rootModel.transponders[0];
            var transponderModifiedEvent = new transponder_modified_event_1.TransponderModifiedEvent(rootModel, transponder.id, ['name', 'id', 'powerLimit', 'bandwidth'], ['newName', 'newId', '111', '222']);
            transponderModifiedEvent.process();
            expect(transponder.name).toBe('newName');
            expect(transponder.id).toBe('newId');
            expect(transponder.powerLimit).toBe('111');
            expect(transponder.bandwidth).toBe('222');
        });
    });
    describe(app_globals_1.RmEventType[app_globals_1.RmEventType.AllocationAddedEvent], function () {
        it('process() should add allocation with properties from event payload into an existing transponder', function () {
            var newOriginator = new originator_1.Originator('James Pham');
            var transponder = rootModel.transponders[0];
            var allocationAddedEvent = new allocation_added_event_1.AllocationAddedEvent(rootModel, transponder.id, 5, 10, 15, 'Customer1', newOriginator.id, 'Allocation 1');
            allocationAddedEvent.process();
            expect(transponder.allocations.length).toBe(1);
            expect(transponder.allocations[0].originatorId).toBe(newOriginator.id);
            expect(transponder.allocations[0].powerUsage).toBe(15);
            expect(transponder.allocations[0].startFrequency).toBe(5);
            expect(transponder.allocations[0].stopFrequency).toBe(10);
            expect(transponder.allocations[0].name).toBe('Allocation 1');
        });
    });
    describe(app_globals_1.RmEventType[app_globals_1.RmEventType.CustomerAddedEvent], function () {
        it('process() should add new customer with properties from event payload into an existing root model', function () {
            var customerAddedEvent = new customer_added_event_1.CustomerAddedEvent(rootModel, 'Intelsat');
            customerAddedEvent.process();
            var customerAdded = rootModel.getCustomer(customerAddedEvent.customerId);
            expect(customerAdded.name).toBe(customerAddedEvent.customerName);
            expect(customerAdded.id).toBe(customerAddedEvent.customerId);
        });
    });
    describe(app_globals_1.RmEventType[app_globals_1.RmEventType.CustomerModifiedEvent], function () {
        it('process() should modify existing customer', function () {
            expect(rootModel.customers.length).toBe(0);
            var customerId = 'id12345';
            var newCustomer = new customer_1.Customer('Intelsat', customerId);
            rootModel.addCustomer(newCustomer);
            var customerModifiedEvent = new customer_modified_event_1.CustomerModifiedEvent(rootModel, customerId, ['name', 'id'], ['NameChanged', 'KeyChanged']);
            customerModifiedEvent.process();
            expect(rootModel.customers.length).toBe(1);
            expect(rootModel.customers[0].id).toBe('KeyChanged');
            expect(rootModel.customers[0].name).toBe('NameChanged');
        });
        it('process() should throw an error, given a customer ID that does not exist', function () {
            expect(rootModel.customers.length).toBe(0);
            var customerId = 'id12345';
            var newCustomer = new customer_1.Customer('Intelsat', customerId);
            rootModel.addCustomer(newCustomer);
            // Use a non-existing customer ID
            var customerModifiedEvent = new customer_modified_event_1.CustomerModifiedEvent(rootModel, 'diffId', ['name', 'id'], ['NameChanged', 'KeyChanged']);
            expect(function () {
                customerModifiedEvent.process();
            })
                .toThrowError();
        });
    });
});
//# sourceMappingURL=rm-events.spec.js.map