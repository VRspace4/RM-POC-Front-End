import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {Transponder} from "../models/transponder";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class AllocationRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    public allocationId: string
  ) {
    super(rootModel, RmEventType[RmEventType.AllocationRemovedEvent]);
  }

  public process(): RootModel {
    const transponder: Transponder = this.rootModel.getTransponder(this.transponderId);
    transponder.removeAllocation(this.allocationId);
    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    // Make sure transponderId exists
    const transponderIndex = this.rootModel.getTransponderIndex(this.transponderId);
    result = this.checkIfIdExists(this.transponderId, transponderIndex, 'transponder ID');
    if (result.passed === false) {
      return result;
    }

    // Make sure allocationId exists
    const allocationIndex = this.rootModel.transponders[transponderIndex].getAllocationIndex(this.allocationId);
    result = this.checkIfIdExists(this.allocationId, allocationIndex, 'allocation ID');
    if (result.passed === false) {
      return result;
    }

    // Verify process()
    const verifyProcessResults = this.verifyProcess();
    const combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);

    return combinedVerifyProcessResults;
  }


  protected verifyProcess(): VerificationOutput[] {
    return [new VerificationOutput()]; // nothing to verify
  }
}
