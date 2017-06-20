import {Transponder} from "../models/transponder";
import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Allocation} from "../models/allocation";
import {TransponderService} from "../services/transponder.service";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class AllocationModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    public allocationId: string,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value, RmEventType[RmEventType.AllocationModifiedEvent]);
  }

  public process(): RootModel {
    this.throwIfVerificationFails();
    const transponder: Transponder = this.rootModel.getTransponder(this.transponderId);
    const allocationToChange: Allocation = transponder.getAllocation(this.allocationId);

    this.applyModifications(allocationToChange);

    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    // Make sure transponderId exists
    const transponderIndex = this.rootModel.getTransponderIndex(this.transponderId);
    result = this.checkIfIdExists(this.transponderId, transponderIndex, 'transponder ID');
    if (result.passed === false) {
      return result;
    }

    // Make sure allocationId exists
    const allocationIndex = this.rootModel.transponders[transponderIndex].getAllocationIndex(this.allocationId);
    result = this.checkIfIdExists(this.allocationId, allocationIndex, 'allocation ID');
    if (result.passed === false) {
      return result;
    }

    // Verify process()
    const verifyProcessResults = this.verifyProcess();
    const combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);

    return combinedVerifyProcessResults;
  }

  protected verifyProcess(): VerificationOutput[] {
    const transponder: Transponder = this.rootModel.getTransponder(this.transponderId);
    const allocationClone: Allocation = Object.assign({}, transponder.getAllocation(this.allocationId));

    // Apply modification to the clone and verify. This does not
    // make modification to the official model.
    this.applyModifications(allocationClone);

    const results = TransponderService.runAllNewAllocationVerifications(transponder.powerLimit,
      transponder.allocations, allocationClone);

    results.push(this.verifyKeysAndValues(allocationClone));

    results.push(this.verifyNameIdConflicts(transponder.allocations));

    return results;
  }
}
