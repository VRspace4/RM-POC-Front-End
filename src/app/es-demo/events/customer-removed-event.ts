import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {VerificationOutput} from "../types/verification-output";
import {Customer} from "../models/customer";
import {RmEventType} from "../../app.globals";

export class CustomerRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public customerId: string
  ) {
    super(rootModel, RmEventType[RmEventType.CustomerRemovedEvent]);
  }

  public process(): RootModel {
    this.throwIfVerificationFails();
    this.rootModel.removeCustomer(this.customerId);
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
    const customerToBeRemoved = this.rootModel.getCustomer(this.customerId);
    const result = customerToBeRemoved.verifyCustomerDeletion(this.rootModel);
    return [result];
  }

}
