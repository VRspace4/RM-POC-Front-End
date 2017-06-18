import {RootModel} from "../models/root-model";
import {VerificationOutput} from "../types/verification-output";
import {createVerify} from "crypto";
import {generateUUID} from "../../app.helpers";

export abstract class EsEvent {
  constructor(
    public rootModel: RootModel,
    public name: string,
    public parent: number = null,
  ) {}

  abstract process(): RootModel;
  protected abstract verifyProcess(): VerificationOutput[];
  abstract verifyEvent(): VerificationOutput;

  protected throwIfVerificationFails() {
    const results  = this.verifyProcess();
    const combinedResults = this.combineAllVerifications(results);

    if (combinedResults.passed === false) {
      throw new Error(combinedResults.failedMessage);
    }
  }

  protected combineAllVerifications(verifications: VerificationOutput[]): VerificationOutput {
    const result = new VerificationOutput();
    result.failedMessage = 'The following verification(s) failed and was not handled:\n';

    for (const verification of verifications) {
      if (verification.passed === false) {
        result.failedMessage = verification.failedMessage + '\n';
        result.passed = false;
      }
    }

    return result;
  }

  protected ifEmptyGenerateUUID(id: string): string {
    let returnId: string;
    if (this.checkIfValidBasicValue<string>(id).passed === false)  {
      returnId = generateUUID();
    } else {
      returnId = id;
    }
    return returnId;
  }

  protected checkIfValidBasicValue<T>(value: T): VerificationOutput {
    const result = new VerificationOutput();
    if (value === null || typeof value === 'undefined')  {
      result.passed = false;
      result.failedMessage = "The value cannot be undefined!";
    } else if (typeof value === 'string' && value === '') {
      result.passed = false;
      result.failedMessage = "The string value cannot be empty!";
    }
    return result;
  }

  protected checkIfIdExists(newId: string, existingId: number, idType: string): VerificationOutput {
    const result = new VerificationOutput();
    if (existingId < 0) {
      result.passed = false;
      result.failedMessage = `The ${idType}, ${newId}, does not exist!`;
      return result;
    }
    return result;
  }
}
