import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Customer} from "../models/customer";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class CustomerModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public customerId: string,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value, RmEventType[RmEventType.CustomerModifiedEvent]);
  }

  public process(): RootModel {
    this.throwIfVerificationFails();
    const customerToChange: Customer = this.rootModel.getCustomer(this.customerId);
    this.applyModifications(customerToChange);
    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    // Make sure customerId exists
    const customerIndex = this.rootModel.getTransponderIndex(this.customerId);
    result = this.checkIfIdExists(this.customerId, customerIndex , 'customer ID');
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

    results.push(this.verifyKeysAndValues(new Customer('abc')));
    results.push(this.verifyNameIdConflicts(this.rootModel.customers));
    return results;
  }
}
