import {Transponder} from "../models/transponder";
import {EsModificationEvent} from "./es-modification-event";

export class CustomerModifiedEvent extends EsModificationEvent{
  constructor(
    transponder: Transponder,
    public customerId: string,
    key: string[],
    value: string[]
  ) {
    super(transponder, key, value);
  }

  process(): Transponder {
    const customerToModify = this.transponder.getCustomer(this.customerId);
    if (customerToModify) {
      this.applyModifications(customerToModify);
    } else {
      throw new Error('The customer to be modified with id, ' + this.customerId + ', does not exist!');
    }
    return this.transponder;
  }
}
