import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class RootModelModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value, RmEventType[RmEventType.RootModelModifiedEvent]);
  }
  public process(): RootModel {
    this.throwIfVerificationFails();
    this.applyModifications(this.rootModel);
    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    // Verify process()
    const verifyProcessResults = this.verifyProcess();
    const combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);

    return combinedVerifyProcessResults;
  }


  protected verifyProcess(): VerificationOutput[] {
    const result = this.verifyKeysAndValues(this.rootModel);
    return [result];
  }
}
