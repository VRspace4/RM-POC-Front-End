import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Transponder} from "../models/transponder";

export class TransponderModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value, 'TransponderModifiedEvent');
  }

  process(): RootModel {
    const transponderToChange: Transponder = this.rootModel.getTransponder(this.transponderId);
    this.applyModifications(transponderToChange);
    return this.rootModel;
  }
}
