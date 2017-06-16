import {BaseEntity} from "./base-entity";
import {generateUUID} from "../../app.helpers";
import {VerificationOutput} from "../types/verification-output";
import {RootModel} from "./root-model";

export class Customer extends BaseEntity {
  constructor(
    name: string,
    id: string = generateUUID()
  ) {
    super(name, id);
  }

  public verifyCustomerNameDuplication(rootModel: RootModel): VerificationOutput {
    const result = this.verifyEntityNameDuplication(rootModel, rootModel.customers);
    return result;
  }

  public verifyCustomerDeletion(rootModel: RootModel): VerificationOutput {
    const result = new VerificationOutput();

    // Traverse through all allocations from all transponders to make sure
    // the customer isn't being referenced
    for (const transponder of rootModel.transponders) {
      for (const allocation of transponder.allocations) {
        if (allocation.customerId === this.id) {
          result.passed = false;
          result.failedMessage =
            `Cannot delete the customer, ${this.name}. It's currently assigned to at least one allocation.`;
          break;
        }
        if (result.passed = false) {
          break;
        }
      }
    }

    return result;
  }
}
