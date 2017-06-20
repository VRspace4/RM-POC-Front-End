"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transponder_1 = require("../models/transponder");
var transponder_added_event_1 = require("../events/transponder-added-event");
var app_globals_1 = require("../../app.globals");
var root_model_1 = require("../models/root-model");
var transponder_service_1 = require("./transponder.service");
var allocation_1 = require("../models/allocation");
describe('RM Services', function () {
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
    });
    describe('Transponder services', function () {
        var transponder;
        beforeEach(function () {
            var allocation1 = new allocation_1.Allocation(0, 10, 15, 'Customer1', 'JP1', 'Allocation 1');
            var allocation2 = new allocation_1.Allocation(20, 30, 15, 'Customer1', 'JP1', 'Allocation 2');
            var allocation3 = new allocation_1.Allocation(31, 40, 15, 'Customer1', 'JP1', 'Allocation 3');
            transponder = rootModel.transponders[0];
            transponder.addAllocation(allocation1);
            transponder.addAllocation(allocation2);
            transponder.addAllocation(allocation3);
        });
        it('[Service] TransponderService - runAllNewAllocationVerifications(), should pass', function () {
            var newAllocation = new allocation_1.Allocation(15, 17, 15, 'Customer1', 'JP1', 'New Allocation');
            var results = transponder_service_1.TransponderService.runAllNewAllocationVerifications(rootModel.transponders[0].powerLimit, transponder.allocations, newAllocation);
            var passed = true;
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var result = results_1[_i];
                passed = passed && result.passed;
            }
            expect(passed).toBe(true);
        });
        it('[Service] TransponderService - confirmAllocationHasNoConflict(), should pass', function () {
            var newAllocation = new allocation_1.Allocation(15, 19, 15, 'Customer1', 'JP1', 'New Allocation');
            var result = transponder_service_1.TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
            expect(result.passed).toBe(true);
        });
        it('[Service] TransponderService - confirmAllocationHasNoConflict(), should fail because of lower bound conflict', function () {
            var newAllocation = new allocation_1.Allocation(5, 19, 15, 'Customer1', 'JP1', 'New Allocation');
            var result = transponder_service_1.TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
            expect(result.passed).toBe(false);
        });
        it('[Service] TransponderService - confirmAllocationHasNoConflict(), should fail because of upper bound conflict', function () {
            var newAllocation = new allocation_1.Allocation(15, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            var result = transponder_service_1.TransponderService.confirmAllocationHasNoConflict(transponder.allocations, newAllocation);
            expect(result.passed).toBe(false);
        });
        it('[Service] TransponderService - verifyAllocationFrequency(), should return true', function () {
            var newAllocation = new allocation_1.Allocation(10, 20, 15, 'Customer1', 'JP1', 'New Allocation 1');
            var result = transponder_service_1.TransponderService.verifyAllocationFrequency(newAllocation);
            expect(result.passed).toBe(true);
        });
        it('[Service] TransponderService - verifyAllocationFrequency(), should fail', function () {
            var newAllocation = new allocation_1.Allocation(30, 20, 15, 'Customer1', 'JP1', 'New Allocation');
            var result = transponder_service_1.TransponderService.verifyAllocationFrequency(newAllocation);
            expect(result.passed).toBe(false);
        });
    });
});
//# sourceMappingURL=rm-services.spec.js.map