import {RootModel} from "../models/root-model";
import {VerificationOutput} from "../types/verification-output";
import {createVerify} from "crypto";

export abstract class EsEvent {
  constructor(
    public rootModel: RootModel,
    public name: string,
    public parent: number = null,
  ) {}

  abstract process(): RootModel;
  abstract verifyProcess(): VerificationOutput[];

  protected throwIfVerificationFails() {
    const results  = this.verifyProcess();
    let resultOutput = 'The following verification(s) failed and was not handled:\n';
    let allPassed = true;

    for (const result of results) {
      if (result.passed === false) {
        resultOutput = result.failedMessage + '\n';
          allPassed = false;
      }
    }

    if (allPassed === false) {
      throw new Error(resultOutput);
    }

  }
}
