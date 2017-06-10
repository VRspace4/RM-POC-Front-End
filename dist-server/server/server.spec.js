"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appGlobal = require("../app/app.globals");
var server = require("./server");
var node_fetch_1 = require("node-fetch");
var event_repository_1 = require("./event-repository");
var customer_added_event_1 = require("../app/es-demo/events/customer-added-event");
var transponder_1 = require("../app/es-demo/models/transponder");
var allocation_added_event_1 = require("../app/es-demo/events/allocation-added-event");
var originator_1 = require("../app/es-demo/models/originator");
var root_model_1 = require("../app/es-demo/models/root-model");
console.log('\n\n------======== (' + Date() + ') ========------\n');
/**
 *
 */
describe('EventRepository class', function () {
    var rootModel;
    beforeEach(function () {
        rootModel = new root_model_1.RootModel('Testing');
        var transponder = new transponder_1.Transponder('Transponder 1');
        rootModel.addTransponder(transponder);
    });
    /**
     *
     */
    describe('serializeEvent() ', function () {
        it('should remove rootModel from the event object', function () {
            var customer = new customer_added_event_1.CustomerAddedEvent(rootModel, 'Intelsat', 'id123');
            var result = event_repository_1.EventRepository.serializeEvent(customer);
            expect(result).not.toContain('rootModel');
        });
    });
    /**
     *
     */
    describe('deserializeEvent()', function () {
        it('should convert JSON object into a specific EsEvent object', function () {
            var originator = new originator_1.Originator('James Pham');
            var customerAddedEvent = new customer_added_event_1.CustomerAddedEvent(null, 'Intelsat', 'id123');
            var allocationAddedEvent = new allocation_added_event_1.AllocationAddedEvent(null, rootModel.transponders[0].id, 0, 10, 10, 'Customer1', originator.id, 'Allocation 1');
            // Simulating how deserializeEvent() is used from real code
            var events = [customerAddedEvent, allocationAddedEvent];
            var parentId = 123;
            var jsonString = JSON.parse(JSON.stringify({ events: events, parentId: parentId }));
            var deserializedEvent = event_repository_1.EventRepository.deserializeEvent(jsonString.events.shift(), rootModel);
            expect(deserializedEvent instanceof customer_added_event_1.CustomerAddedEvent).toBeTruthy();
        });
    });
    // describe('createNewTransponderEvent', () => {
    //   it('should a create a new transponder event in neo4j then delete it', function(done: DoneFn) {
    //     const promise = new Promise(function(resolve, reject) {
    //       const newTransponderAddedEvent = new TransponderAddedEvent('Transponder 5');
    //       const cmdOutput: any = EventRepository.createNewTransponderEvent(newTransponderAddedEvent);
    //       resolve(cmdOutput);
    //     }).then((cmdOutput: any) => {
    //       console.log(EventRepository.getNodeIdFromCmdOutput(cmdOutput));
    //       done();
    //     });
    //   });
    // });
    // describe('getChainOfEvents()', () => {
    //   it('given an eventId, should return the chain of events', function() {
    //     EventRepository.getChainOfEvents(140)
    //       .then((response) => {
    //         console.log(response);
    //       });
    //   });
    // });
});
/**
 * Server endpoints
 */
describe('Server endpoints', function () {
    var serverInstance;
    beforeEach(function (done) {
        serverInstance = server.run(done, false);
    });
    afterEach(function (done) {
        serverInstance.close(done);
    });
    /**
     * Test /hello
     */
    describe('/hello', function () {
        it('should return a static test text', function (done) {
            expect(function () {
                node_fetch_1.default(appGlobal.url + '/hello').then(function (response) {
                    return response.text();
                }).then(function (response) {
                    expect(response).toEqual('It worked!');
                    done();
                });
            }).not.toThrow();
        });
    });
});
//# sourceMappingURL=server.spec.js.map