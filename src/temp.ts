// import {Allocation} from "./app/es-demo/models/allocation";
// const allocation1 = new Allocation(0, 15, 10, 'Intelsat1', 'JP1');
// const allocation2 = new Allocation(20, 35, 10, 'Intelsat1', 'JP1');
// const allocation3 = new Allocation(30, 35, 10, 'Intelsat1', 'JP1');
//
// let allocations: Allocation[] = [allocation1, allocation2];
//
// console.log('#### before', allocations);
//
// allocations[0].customerId = 'Changed!';
//
//
// function testFunc(newAllocation: Allocation) {
//   newAllocation.customerId = 'Changed inside testFunc!';
// };
//
// testFunc(allocations[0]);
//
// console.log('### after', allocations);


import {RootModel} from "./app/es-demo/models/root-model";
import {TransponderModifiedEvent} from "./app/es-demo/events/transponder-modified-event";
import {Transponder} from "./app/es-demo/models/transponder";
import {Allocation} from "./app/es-demo/models/allocation";

const rootModel = new RootModel('Production');

const transponder1 = new Transponder('Transponder 1');
const transponder2 = new Transponder('Transponder 2');

rootModel.addTransponder(transponder1);
rootModel.addTransponder(transponder2);

const changedTransponder: Transponder = rootModel.getTransponder(transponder1.id);
const index: number = rootModel.getTransponderIndex(transponder1.id);
const newAllocation = new Allocation(0, 15, 10, 'Intelsat1', 'JP1');

console.log('## original', rootModel.transponders);
rootModel.transponders[index].name = 'YYYYYYYYYYYY';
changedTransponder.addAllocation(newAllocation);
console.log('## changedTransponder', rootModel.transponders);
