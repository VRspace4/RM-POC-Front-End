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
            expect(function () {
                transponder_service_1.TransponderService.confirmAllocationHasNoConflict(allocations, newAllocation);
            }).toBeTruthy();
        });
        it('given new and conflicting allocation to be added, should throw error', function () {
            var newAllocation = new allocation_1.Allocation(15, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            expect(function () {
                transponder_service_1.TransponderService.confirmAllocationHasNoConflict(allocations, newAllocation);
            }).toThrowError();
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
            expect(transponder_service_1.TransponderService.verifyAllocationFrequency(newAllocation))
                .toBeTruthy();
        });
        it('given allocation with start frequency larger than stop frequency, should throw error', function () {
            var newAllocation = new allocation_1.Allocation(36, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            expect(function () {
                transponder_service_1.TransponderService.verifyAllocationFrequency(newAllocation);
            }).toThrowError();
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
            expect(function () {
                transponder_service_1.TransponderService.runAllNewAllocationVerifications(allocations, newAllocation);
            }).toBeTruthy();
        });
        it('given new and conflicting allocation to be added, should throw error', function () {
            var newAllocation = new allocation_1.Allocation(15, 25, 15, 'Customer1', 'JP1', 'New Allocation');
            expect(function () {
                transponder_service_1.TransponderService.runAllNewAllocationVerifications(allocations, newAllocation);
            }).toThrowError();
        });
    });
});
//# sourceMappingURL=es-demo-services.spec.js.map