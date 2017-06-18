import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {RmEventType} from "../../app.globals";
import {VerificationOutput} from "../types/verification-output";

export class TransponderRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string
  ) {
    super(rootModel, RmEventType[RmEventType.TransponderRemovedEvent]);
  }

  public process(): RootModel {
    this.throwIfVerificationFails();
    this.rootModel.removeTransponder(this.transponderId);
    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    // Make sure transponderId exists
    const transponderIndex = this.rootModel.getTransponderIndex(this.transponderId);
    result = this.checkIfIdExists(this.transponderId, transponderIndex , 'transponder ID');
    if (result.passed === false) {
      return result;
    }

    // Verify process()
    const verifyProcessResults = this.verifyProcess();
    const combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);

    return combinedVerifyProcessResults;
  }


  protected verifyProcess(): VerificationOutput[] {
    const result = new VerificationOutput();
    return [result]; // nothing to verify
  }
}
