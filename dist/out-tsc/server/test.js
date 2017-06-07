"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_modified_event_1 = require("../app/es-demo/events/customer-modified-event");
var transponder_1 = require("../app/es-demo/models/transponder");
var transponder = new transponder_1.Transponder('transponder1');
var testObj = new customer_modified_event_1.CustomerModifiedEvent(transponder, [], []);
// testObj.testFunc();
// console.log(transponder.name);
//# sourceMappingURL=test.js.map