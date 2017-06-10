// import {AllocationModifiedEvent} from "./allocation-modified-event";
// import {Transponder} from "../models/transponder";
// import {Allocation} from "../models/allocation";
// /**
//  * ES-demo events
//  */
// describe('ES-demo events', () => {
//   beforeEach(() => {
//     const transponder = new Transponder('Transponder 1');
//   })
//   describe('AllocationModifiedEvent class', () => {
//     beforeEach(() => {
//       const newAllocation1 = new Allocation(0, 10, 15, 'originatorID1', 'Allocation 1');
//       const newAllocation2 = new Allocation(11, 20, 9, 'originatorID1', 'Allocation 2');
//       this.transponder.addAllocation(newAllocation1);
//       this.transponder.addAllocation(newAllocation2);
//     });
//     it('given an invalid allocation ID, process() should throw an error', function() {
//       const invalidAllocationId = 'invalidId123';
//       expect(function() {
//         const allocationModifiedEvent = new AllocationModifiedEvent(this.transponder,
//           invalidAllocationId, [], []);
//       }).toThrow();
//     });
//     it('given an invalid property key, process() should throw an error', function() {
//       // const allocationModifiedEvent = new AllocationModifiedEvent(this.transponder,
//       //   )
//       pending('pending');
//     });
//   });
// });
//# sourceMappingURL=es-events.spec.js.map