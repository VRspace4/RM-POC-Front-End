"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var allocation_1 = require("../models/allocation");
var transponder_service_1 = require("./transponder.service");
describe('[es-demo-services.spec.ts] TransponderService class', function () {
    /**
     *
     */
    describe('confirmAllocationHasNoConflict()', function () {
        var allocations;
        beforeEach(function () {
            var allocation1 = new allocation_1.Allocation(0, 10, 15, 'Customer1', 'JP1', 'Allocation 1');
            var allocation2 = new allocation_1.Allocation(11, 19, 15, 'Customer1', 'JP1', 'Allocation 2');
            allocations = [allocation1, allocation2];
        });
        it('given new and non conflicting allocation to be added, should pass', function () {
            var newAllocation = new allocation_1.Allocation(20, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            var result = transponder_service_1.TransponderService.confirmAllocationHasNoConflict(allocations, newAllocation);
            expect(result.passed).toBeTruthy();
        });
        it('given new and conflicting allocation to be added, should throw error', function () {
            var newAllocation = new allocation_1.Allocation(15, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            var result = transponder_service_1.TransponderService.confirmAllocationHasNoConflict(allocations, newAllocation);
            expect(result.passed).toBeFalsy();
        });
    });
    /**
     *
     */
    describe('verifyAllocationFrequency()', function () {
        var allocations;
        beforeEach(function () {
            var allocation1 = new allocation_1.Allocation(0, 10, 15, 'Customer1', 'JP1', 'Allocation 1');
            var allocation2 = new allocation_1.Allocation(11, 19, 15, 'Customer1', 'JP1', 'Allocation 2');
            allocations = [allocation1, allocation2];
        });
        it('given a non conflicting allocation, should pass', function () {
            var newAllocation = new allocation_1.Allocation(20, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            var result = transponder_service_1.TransponderService.verifyAllocationFrequency(newAllocation);
            expect(result).toBeTruthy();
        });
        it('given allocation with start frequency larger than stop frequency, should throw error', function () {
            var newAllocation = new allocation_1.Allocation(36, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            var result = transponder_service_1.TransponderService.verifyAllocationFrequency(newAllocation);
            expect(result.passed).toBeFalsy();
        });
    });
    /**
     *
     */
    describe('runAllNewAllocationVerifications()', function () {
        var allocations;
        beforeEach(function () {
            var allocation1 = new allocation_1.Allocation(0, 10, 15, 'Customer1', 'JP1', 'Allocation 1');
            var allocation2 = new allocation_1.Allocation(11, 19, 15, 'Customer1', 'JP1', 'Allocation 2');
            allocations = [allocation1, allocation2];
        });
        it('given new and non conflicting allocation to be added, should pass', function () {
            var newAllocation = new allocation_1.Allocation(20, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            var results = transponder_service_1.TransponderService.runAllNewAllocationVerifications(500, allocations, newAllocation);
            var allPassed = true;
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var result = results_1[_i];
                allPassed = allPassed && result.passed;
            }
            expect(allPassed).toBeTruthy();
        });
        it('given new and conflicting allocation to be added, should throw error', function () {
            var newAllocation = new allocation_1.Allocation(15, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            var results = transponder_service_1.TransponderService.runAllNewAllocationVerifications(500, allocations, newAllocation);
            var allPassed = true;
            for (var _i = 0, results_2 = results; _i < results_2.length; _i++) {
                var result = results_2[_i];
                allPassed = allPassed && result.passed;
            }
            expect(allPassed).toBeFalsy();
        });
        it('given new allocation with power usage within limit, should pass', function () {
            var newAllocation = new allocation_1.Allocation(20, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            var results = transponder_service_1.TransponderService.runAllNewAllocationVerifications(100, allocations, newAllocation);
            var allPassed = true;
            for (var _i = 0, results_3 = results; _i < results_3.length; _i++) {
                var result = results_3[_i];
                allPassed = allPassed && result.passed;
            }
            expect(allPassed).toBeTruthy();
        });
        it('given new allocation with power usage exceeding limit, should throw error', function () {
            var newAllocation = new allocation_1.Allocation(15, 25, 5000, 'Customer1', 'JP1', 'New Allocation');
            var results = transponder_service_1.TransponderService.runAllNewAllocationVerifications(100, allocations, newAllocation);
            var allPassed = true;
            for (var _i = 0, results_4 = results; _i < results_4.length; _i++) {
                var result = results_4[_i];
                allPassed = allPassed && result.passed;
            }
            expect(allPassed).toBeFalsy();
        });
    });
});
//# sourceMappingURL=es-demo-services.spec.js.map