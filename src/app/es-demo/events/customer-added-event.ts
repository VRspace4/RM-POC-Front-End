import {generateUUID} from "../../app.helpers";
import {Customer} from "../models/customer";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";

export class CustomerAddedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public customerName: string,
    public customerId: string = generateUUID()
  ) {
    super(rootModel, 'CustomerAddedEvent');
  }

  process(): RootModel {
    const newCustomer = new Customer(this.customerName, this.customerId);
    this.rootModel.addCustomer(newCustomer);
    return this.rootModel;
  }

}
