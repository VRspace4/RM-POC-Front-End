"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var neo4j_driver_1 = require("neo4j-driver");
var transponder_added_event_1 = require("../app/es-demo/events/transponder-added-event");
var transponder_modified_event_1 = require("../app/es-demo/events/transponder-modified-event");
var customer_added_event_1 = require("../app/es-demo/events/customer-added-event");
var customer_modified_event_1 = require("../app/es-demo/events/customer-modified-event");
var allocation_added_event_1 = require("../app/es-demo/events/allocation-added-event");
var allocation_modified_event_1 = require("../app/es-demo/events/allocation-modified-event");
var uri = 'bolt://localhost';
var driver = neo4j_driver_1.v1.driver(uri, neo4j_driver_1.v1.auth.basic('neo4j', '9colada'));
var session = driver.session();
var EventRepository = (function () {
    function EventRepository() {
    }
    EventRepository.getNodeIdFromCmdOutput = function (cmdOutput) {
        if (cmdOutput === null) {
            throw new Error('The input neo4j command output should not be empty!');
        }
        return parseInt(cmdOutput.records[0].get(0).identity.low, 10);
    };
    EventRepository.serializeEvent = function (event) {
        var cloneEvent = JSON.parse(JSON.stringify(event));
        delete cloneEvent.transponder;
        return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
    };
    EventRepository.deserializeEvent = function (event, rootModel) {
        switch (event.name) {
            case 'TransponderAddedEvent':
                var transponderAddedEvent = event;
                return new transponder_added_event_1.TransponderAddedEvent(rootModel, transponderAddedEvent.transponderName, transponderAddedEvent.transponderId);
            case 'TransponderModifiedEvent':
                var transponderModifiedEvent = event;
                return new transponder_modified_event_1.TransponderModifiedEvent(rootModel, transponderModifiedEvent.transponderId, transponderModifiedEvent.key, transponderModifiedEvent.value);
            case 'CustomerAddedEvent':
                var customerAddedEvent = event;
                return new customer_added_event_1.CustomerAddedEvent(rootModel, customerAddedEvent.customerName, customerAddedEvent.customerId);
            case 'CustomerModifiedEvent':
                var customerModifiedEvent = event;
                return new customer_modified_event_1.CustomerModifiedEvent(rootModel, customerModifiedEvent.customerId, customerModifiedEvent.key, customerModifiedEvent.value);
            case 'AllocationAddedEvent':
                var allocationAddedEvent = event;
                return new allocation_added_event_1.AllocationAddedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.startFrequency, allocationAddedEvent.stopFrequency, allocationAddedEvent.powerUsage, allocationAddedEvent.customerId, allocationAddedEvent.originatorId, allocationAddedEvent.allocationName, allocationAddedEvent.allocationId);
            case 'AllocationModifiedEvent':
                var allocationModifiedEvent = event;
                return new allocation_modified_event_1.AllocationModifiedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.allocationId, allocationModifiedEvent.key, allocationModifiedEvent.value);
        }
    };
    EventRepository.processEvent = function (event, parentId) {
        var promise;
        if (parentId) {
            promise = this.appendEvent(event, parentId);
        }
        else {
            promise = this.createNewTransponderEvent(event);
        }
        return new Promise(function (resolve, reject) {
            promise.then(function (result) {
                var eventId = result.records[0].get(0).identity.low;
                console.log('eventId = ', eventId);
                resolve(eventId);
            });
        });
    };
    EventRepository.appendEvent = function (event, parentId) {
        var serializedEvent = EventRepository.serializeEvent(event);
        var command = "MATCH (parent:Event) where ID(parent) = " + parentId + " \n      CREATE (parent)-[r:APPEND {parentId: " + parentId + "}]->(e:Event " + serializedEvent + ") RETURN e";
        return session.run(command);
    };
    EventRepository.createNewTransponderEvent = function (newTransponderAddedEvent) {
        var serializedEvent = this.serializeEvent(newTransponderAddedEvent);
        var command = "CREATE (e:Event " + serializedEvent + ") RETURN e";
        return session.run(command);
    };
    // static delete
    EventRepository.getChainOfEvents = function (eventId) {
        var _this = this;
        var command = "MATCH (x:Event)-[:APPEND*0..]->(e:Event) where ID(e) = " + eventId + " RETURN x order by id(x)";
        console.log(command);
        return new Promise(function (resolve, reject) {
            session.run(command).then(function (result) {
                var rootModel;
                var events = result.records.map(function (record) {
                    var event = _this.deserializeEvent(record.get(0).properties, rootModel);
                    rootModel = event.rootModel;
                    return event;
                });
                resolve(events);
            });
        });
    };
    EventRepository.postTransponderCreatedEvent = function (event) {
        var serializedEvent = this.serializeEvent(event);
    };
    return EventRepository;
}());
exports.EventRepository = EventRepository;
//# sourceMappingURL=event-repository.js.map