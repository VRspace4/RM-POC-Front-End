import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Customer} from "../models/customer";

export class CustomerModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public customerId: string,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value);
  }

  process(): RootModel {
    const customerToChange: Customer = this.rootModel.getCustomer(this.customerId);
    this.applyModifications(customerToChange);
    return this.rootModel;
  }
}
