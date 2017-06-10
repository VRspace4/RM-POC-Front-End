import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";

export class OriginatorRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public originatorId: string
  ) {
    super(rootModel, 'OriginatorRemovedEvent');
  }

  process(): RootModel {
    this.rootModel.removeOriginator(this.originatorId);
    return this.rootModel;
  }
}
