import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Originator} from "../models/originator";

export class OriginatorModified extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public originatorId: string,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value);
  }

  process(): RootModel {
    const originatorToChange: Originator = this.rootModel.getOriginator(this.originatorId);
    this.applyModifications(originatorToChange);
    return this.rootModel;
  }
}
