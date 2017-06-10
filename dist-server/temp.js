"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var root_model_1 = require("./app/es-demo/models/root-model");
var transponder_1 = require("./app/es-demo/models/transponder");
var allocation_1 = require("./app/es-demo/models/allocation");
var rootModel = new root_model_1.RootModel('Production');
var transponder1 = new transponder_1.Transponder('Transponder 1');
var transponder2 = new transponder_1.Transponder('Transponder 2');
rootModel.addTransponder(transponder1);
rootModel.addTransponder(transponder2);
var changedTransponder = rootModel.getTransponder(transponder1.id);
var index = rootModel.getTransponderIndex(transponder1.id);
var newAllocation = new allocation_1.Allocation(0, 15, 10, 'Intelsat1', 'JP1');
console.log('## original', rootModel.transponders);
rootModel.transponders[index].name = 'YYYYYYYYYYYY';
changedTransponder.addAllocation(newAllocation);
console.log('## changedTransponder', rootModel.transponders);
//# sourceMappingURL=temp.js.map