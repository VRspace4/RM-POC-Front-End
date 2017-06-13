import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {Transponder} from "../models/transponder";
import {VerificationOutput} from "../models/verification-output";
import {RmEventType} from "../../app.globals";

export class AllocationRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    public allocationId: string
  ) {
    super(rootModel, RmEventType[RmEventType.AllocationRemovedEvent]);
  }

  process(): RootModel {
    const transponder: Transponder = this.rootModel.getTransponder(this.transponderId);
    transponder.removeAllocation(this.allocationId);
    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    return [new VerificationOutput()]; // nothing to verify
  }
}
