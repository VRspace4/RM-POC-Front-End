import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Transponder} from "../models/transponder";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class TransponderModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    keys: string[],
    values: string[]
  ) {
    super(rootModel, keys, values, RmEventType[RmEventType.TransponderModifiedEvent]);
  }
  public process(): RootModel {
    this.throwIfVerificationFails();
    const transponderToChange: Transponder = this.rootModel.getTransponder(this.transponderId);
    if (typeof transponderToChange !== 'undefined') {
      this.applyModifications(transponderToChange);
    } else {
      throw new Error('Invalid transponder id');
    }
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
    const results: VerificationOutput[] = [];
    results.push(this.verifyKeysAndValues(new Transponder('abc')));
    results.push(this.verifyNameIdConflicts(this.rootModel.transponders));
    return results;
  }
}
