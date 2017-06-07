import {EsEvent} from "../app/es-demo/events/es-event";
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {Transponder} from "../app/es-demo/models/transponder";
import {TransponderModifiedEvent} from "../app/es-demo/events/transponder-modified-event";
import {EventRepository} from "./event-repository";

export class Controller {
  static _transponder: Transponder;

  static insertEvents(eventObjects: EsEvent[], parentId: number, resultCallback: (any) => void) {
    if (eventObjects.length > 0) {
      const event = EventRepository.deserializeEvent(eventObjects.shift(), null);
      EventRepository.processEvent(event, parentId).then((eventId: number) => {
        this.insertEvents(eventObjects, eventId, resultCallback);
      }).catch((e) => resultCallback(e));
    } else {
      this.getTransponder(parentId).then((transponder: Transponder) => {
        this._transponder = transponder;
        resultCallback(transponder);
      });
    }
  }

  static getTransponder(eventId: number) {
    return new Promise((resolve, reject) => {
      EventRepository.getChainOfEvents(eventId).then((events: EsEvent[]) => {
        events.forEach((event: EsEvent) =>
          event.process());
        const transponder: Transponder = events[0].transponder;

        transponder.eventId = eventId;
        resolve(transponder);
      });
    });
  }

  // static deserializeEvent(event: EsEvent, transponder: Transponder = this._transponder) {
  //   switch(event.name) {
  //     case 'NewTransponderAdded':
  //       return <TransponderAddedEvent>event;
  //   }
  // }

  static createNewTransponder(transponderName: string) {
    this._transponder = new Transponder('Transponder jj1');
    const events = [
      new TransponderAddedEvent(transponderName),
      new TransponderModifiedEvent(this._transponder,
        ['bandwidth', 'powerLimit'],
        ['150', '200'])
    ];
  }

}
