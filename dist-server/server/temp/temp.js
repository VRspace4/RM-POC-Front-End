"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_added_event_1 = require("../../app/es-demo/events/customer-added-event");
var rm_message_producer_service_1 = require("../rm-demo/command/rm-message-producer.service");
var jsonStr = '{name:"RootModelAddedEvent",parent:null,rootModelName:' +
    '"Production",rootModelId:"60a2b078",transponders:[],customers:[],originators:[]}';
// const testObj: EsEvent =
console.log(jsonStr.name);
var customer = new customer_added_event_1.CustomerAddedEvent(null, 'Intelsat');
var customerSerialized = rm_message_producer_service_1.RmMessageProducer.serializeEvent(customer);
console.log(customer);
console.log(customerSerialized);
//# sourceMappingURL=temp.js.map