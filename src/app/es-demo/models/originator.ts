import {BaseEntity} from "./base-entity";
import {generateUUID} from "../../app.helpers";
import {RootModel} from "./root-model";
import {VerificationOutput} from "../types/verification-output";

export class Originator extends BaseEntity {
  constructor (
    name: string,
    id: string = generateUUID()
  ) {
    super(name, id);
  }

  public verifyDeletion(rootModel: RootModel): VerificationOutput {
    const result = new VerificationOutput();

    // Traverse through all allocations from all transponders to make sure
    // the originator isn't being referenced
    for (const transponder of rootModel.transponders) {
      for (const allocation of transponder.allocations) {
        if (allocation.originatorId === this.id) {
          result.passed = false;
          result.failedMessage =
            `Cannot delete the originator, ${this.name}. It's currently assigned to at least one allocation.`;
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
