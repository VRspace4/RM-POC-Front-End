import {EsEvent} from "./app/es-demo/events/es-event.abstract";
const eventObject = {
  name: "TransponderAddedEvent",
  parent: null,
  transpondderName: "Transponder 1",
  transponderId: "424ae987"
};

function verifyEventObject(eventObject: any, eventActual: EsEvent) {
  for (const keyName in eventActual) {
    if (eventObject.hasOwnProperty(keyName) == false) {
      console.log('failed');
    }
  }
}
