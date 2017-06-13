import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {VerificationOutput} from "../models/verification-output";
import {Customer} from "../models/customer";
import {RmEventType} from "../../app.globals";

export class CustomerRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public customerId: string
  ) {
    super(rootModel, RmEventType[RmEventType.CustomerRemovedEvent]);
  }

  process(): RootModel {
    this.throwIfVerificationFails();
    this.rootModel.removeCustomer(this.customerId);
    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    const customerToBeRemoved = this.rootModel.getCustomer(this.customerId);
    const result = customerToBeRemoved.verifyCustomerDeletion(this.rootModel);
    return [result];
  }

}
