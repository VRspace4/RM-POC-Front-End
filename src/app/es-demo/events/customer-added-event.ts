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
    this.customerId = this.ifEmptyGenerateUUID(customerId);
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    result = this.checkIfValidBasicValue<string>(this.customerName);
    if (result.passed === false) {
      return result;
    }

    // Verify process()
    const verifyProcessResults = this.verifyProcess();
    const combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);

    return combinedVerifyProcessResults;
  }

  process(): RootModel {
    this.throwIfVerificationFails();
    const newCustomer = new Customer(this.customerName, this.customerId);
    this.rootModel.addCustomer(newCustomer);
    return this.rootModel;
  }

  protected verifyProcess(): VerificationOutput[] {
    const newCustomer = new Customer(this.customerName, this.customerId);

    const result = newCustomer.verifyCustomerNameDuplication(this.rootModel);

    return [result];
  }


}
