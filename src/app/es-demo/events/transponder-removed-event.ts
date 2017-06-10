import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";

export class TransponderRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string
  ) {
    super(rootModel, 'TransponderRemovedEvent');
  }

  process(): RootModel {
    this.rootModel.removeTransponder(this.transponderId);
    return this.rootModel;
  }
}
