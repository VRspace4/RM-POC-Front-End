import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";

export class CustomerRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public customerId: string
  ) {
    super(rootModel, 'CustomerRemovedEvent');
  }

  process(): RootModel {
    this.rootModel.removeCustomer(this.customerId);
    return this.rootModel;
  }
}
