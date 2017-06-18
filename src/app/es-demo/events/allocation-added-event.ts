import {generateUUID} from "../../app.helpers";
import {Allocation} from "../models/allocation";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {Transponder} from "../models/transponder";
import {IAllocation} from "../models/allocation-interface";
import {TransponderService} from "../services/transponder.service";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class AllocationAddedEvent extends EsEvent implements IAllocation {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    public startFrequency: number,
    public stopFrequency: number,
    public powerUsage: number,
    public customerId: string,
    public originatorId: string,
    public allocationName: string = '',
    public allocationId: string = generateUUID()
  ) {
    super(rootModel, RmEventType[RmEventType.AllocationAddedEvent]);
    this.allocationId = this.ifEmptyGenerateUUID(allocationId);
  }

  public process(): RootModel {
    this.throwIfVerificationFails();
    const newAllocation = new Allocation(
      this.startFrequency, this.stopFrequency, this.powerUsage, this.customerId,
      this.originatorId, this.allocationName, this.allocationId);

    const transponderToChange: Transponder = this.rootModel.getTransponder(this.transponderId);

    transponderToChange.addAllocation(newAllocation);

    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    // Make sure customerId exists
    const customerIndex = this.rootModel.getCustomerIndex(this.customerId);
    result = this.checkIfIdExists(this.customerId, customerIndex, 'customer ID');
    if (result.passed === false) {
      return result;
    }
    // Make sure originatorId exists
    const originatorIndex = this.rootModel.getOriginatorIndex(this.originatorId);
    result = this.checkIfIdExists(this.originatorId, originatorIndex, 'originator ID');
    if (result.passed === false) {
      return result;
    }
    // Make sure transponderId exists
    const transponderIndex = this.rootModel.getTransponderIndex(this.transponderId);
    result = this.checkIfIdExists(this.transponderId, transponderIndex, 'transponder ID');
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
    const allocation = new Allocation(this.startFrequency, this.stopFrequency,
      this.powerUsage, this.customerId, this.originatorId, this.allocationName,
      this.allocationId);

    const results = TransponderService.runAllNewAllocationVerifications(transponder.powerLimit,
      transponder.allocations, allocation);

    return results;
  }

}
