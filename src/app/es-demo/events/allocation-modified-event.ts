import {Transponder} from "../models/transponder";
import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Allocation} from "../models/allocation";

export class AllocationModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    public allocationId: string,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value);
  }

  process(): RootModel {
    const transponder: Transponder = this.rootModel.getTransponder(this.transponderId);
    const allocationToChange: Allocation = transponder.getAllocation(this.allocationId);

    this.applyModifications(allocationToChange);

    return this.rootModel;
  }
}
