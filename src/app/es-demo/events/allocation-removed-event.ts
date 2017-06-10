import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {Transponder} from "../models/transponder";

export class AllocationRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    public allocationId: string
  ) {
    super(rootModel, 'AllocationRemovedEvent');
  }

  process(): RootModel {
    const transponder: Transponder = this.rootModel.getTransponder(this.transponderId);
    transponder.removeAllocation(this.allocationId);
    return this.rootModel;
  }
}
