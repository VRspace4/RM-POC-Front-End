import {generateUUID} from "../../app.helpers";
import {Customer} from "../models/customer";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class CustomerAddedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public customerName: string,
    public customerId: string = generateUUID()
  ) {
    super(rootModel, RmEventType[RmEventType.CustomerAddedEvent]);
  }
  process(): RootModel {
    this.throwIfVerificationFails();
    const newCustomer = new Customer(this.customerName, this.customerId);
    this.rootModel.addCustomer(newCustomer);
    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    const newCustomer = new Customer(this.customerName, this.customerId);

    const result = newCustomer.verifyCustomerNameDuplication(this.rootModel);

    return [result];
  }


}
