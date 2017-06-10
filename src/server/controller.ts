import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {Transponder} from "../app/es-demo/models/transponder";
import {TransponderModifiedEvent} from "../app/es-demo/events/transponder-modified-event";
import {EventRepository} from "./event-repository";
import {EsEvent} from "../app/es-demo/events/es-event.abstract";
import {RootModel} from "../app/es-demo/models/root-model";
import {RootModelAddedEvent} from "../app/es-demo/events/root-model-added-event";
import {RootModelModifiedEvent} from "../app/es-demo/events/root-model-modified-event";
import {CustomerAddedEvent} from "../app/es-demo/events/customer-added-event";
import {Allocation} from "../app/es-demo/models/allocation";
import {OriginatorAddedEvent} from "../app/es-demo/events/originator-added-event";
import {AllocationAddedEvent} from "../app/es-demo/events/allocation-added-event";

export class Controller {
  static _rootModel: RootModel;

  static insertEvents(eventObjects: EsEvent [], parentId: number, resultCallback: (any) => void) {
    if (eventObjects.length > 0) {
      const event = EventRepository.deserializeEvent(eventObjects.shift(), null);
      EventRepository.processEvent(event, parentId).then((eventId: number) => {
        this.insertEvents(eventObjects, eventId, resultCallback);
      }).catch((e) => resultCallback(e));
    } else {
      this.getTransponder(parentId).then((rootModel: RootModel) => {
        resultCallback(rootModel);
      });
    }
  }

  static getTransponder(eventId: number) {
    return new Promise((resolve, reject) => {
      EventRepository.getChainOfEvents(eventId).then((events: EsEvent[]) => {
        events.forEach((event: EsEvent) =>
          event.process());

        // apply this root model to the class level root model
        this._rootModel = events[0].rootModel;

        this._rootModel.eventId = eventId;
        resolve(this._rootModel);
      });
    });
  }


  static createNewRootModel(rootModelName: string) {

  }

}
