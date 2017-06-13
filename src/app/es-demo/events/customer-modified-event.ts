import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Customer} from "../models/customer";
import {VerificationOutput} from "../models/verification-output";
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

  process(): RootModel {
    this.throwIfVerificationFails();
    const customerToChange: Customer = this.rootModel.getCustomer(this.customerId);
    this.applyModifications(customerToChange);
    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    const results: VerificationOutput[] = [];

    results.push(this.verifyKeysAndValues(new Customer('abc')));
    results.push(this.verifyNameIdConflicts(this.rootModel.customers));
    return results;
  }
}
