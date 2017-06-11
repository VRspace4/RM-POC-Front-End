import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";

export class RootModelModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value, 'RootModelModifiedEvent');
  }

  process(): RootModel {
    this.applyModifications(this.rootModel);
    return this.rootModel;
  }
}
