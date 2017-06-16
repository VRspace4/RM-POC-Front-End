import {EsEvent} from "../../app/es-demo/events/es-event.abstract";
import {CustomerAddedEvent} from "../../app/es-demo/events/customer-added-event";
import {RmCommandController} from "../rm-demo/command/rm-command-controller.service";
import {RmMessageProducer} from "../rm-demo/command/rm-message-producer.service";
const jsonStr: any = '{name:"RootModelAddedEvent",parent:null,rootModelName:' +
  '"Production",rootModelId:"60a2b078",transponders:[],customers:[],originators:[]}';
// const testObj: EsEvent =
console.log(jsonStr.name);


const customer = new CustomerAddedEvent(null, 'Intelsat');
const customerSerialized = RmMessageProducer.serializeEvent(customer);
console.log(customer);
console.log(customerSerialized);

