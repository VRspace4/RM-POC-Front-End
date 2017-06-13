import {RootModel} from "../../../app/es-demo/models/root-model";
import {EventRepository} from "../../event-repository";
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";
import {RmCommandRepository} from "./rm-command-repository.service";
import {RmCommonController} from "../rm-common-controller.service";
import {RootModelAddedEvent} from "../../../app/es-demo/events/root-model-added-event";

export class RmCommandController {
  static _rootModel: RootModel;
  static _lastEvent: EsEvent;
  static _lastEventId: number;


  /**
   * First make sure the event processing of the root model is valid.
   * Then insert the event, either new root model event or any other, and then returns
   * the root model object through a callback
   * @param eventObjects
   * @param parentId
   * @param resultCallback
   */
  static insertEvents(eventObjects: EsEvent [], parentId: number,
                      resultCallback: (rootModel: RootModel) => void) {
    if (eventObjects.length > 0) {
      this._lastEvent = RmCommonController.deserializeEvent(eventObjects.shift(), null);

      // Commit that event into the database
      this.processEvent(this._lastEvent, parentId)
        .then((eventId: number) => {
          // Commit successfully finish
          // Apply the event to the Command side Root Model
          this._lastEventId = eventId;

          // Take the rootModel only if from RootModelAddedEvent, otherwise
          // apply the rootModel to the event.
          if (this._lastEvent instanceof RootModelAddedEvent) {
            this._rootModel = this._lastEvent.rootModel;
          } else {
            this._lastEvent.rootModel = this._rootModel;
          }
          this._lastEvent.process();

          // Continue to the next event
          this.insertEvents(eventObjects, eventId, resultCallback);
        });
    } else {
      resultCallback(this._rootModel);
    }
  }

  static processEvent(event: EsEvent, parentId: number): Promise<number> {
    let promise: Promise<number>;
    if (parentId) {
      promise = RmCommandRepository.appendToEventChain(event, parentId);
    } else {
      promise = RmCommandRepository.createNewRootModelEvent(<RootModelAddedEvent>event);
    }

    return new Promise((resolve, reject) => {
      promise.then((result: any) => {
        const eventId = result.records[0].get(0).identity.low;
        resolve(eventId);
      });
    });
  }

  static getRootModelFromEventId(eventId: number): Promise<RootModel> {
    return new Promise((resolve, reject) => {
      RmCommandRepository.getChainOfEvents(eventId).then((events: EsEvent[]) => {
        events.forEach((event: EsEvent) =>
          event.process());

        // apply this root model to the class level root model
        const rootModel: RootModel = events[0].rootModel;

        rootModel.eventId = eventId;
        resolve(rootModel);
      });
    });
  }


}
