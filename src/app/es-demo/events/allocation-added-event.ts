import {generateUUID} from "../../app.helpers";
import {Allocation} from "../models/allocation";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {Transponder} from "../models/transponder";
import {IAllocation} from "../models/allocation-interface";
import {TransponderService} from "../services/transponder.service";
import {VerificationOutput} from "../models/verification-output";
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
  }

  process(): RootModel {
    this.throwIfVerificationFails();
    const newAllocation = new Allocation(
      this.startFrequency, this.stopFrequency, this.powerUsage, this.customerId,
      this.originatorId, this.allocationName, this.allocationId);

    const transponderToChange: Transponder = this.rootModel.getTransponder(this.transponderId);

    transponderToChange.addAllocation(newAllocation);

    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    const transponder: Transponder = this.rootModel.getTransponder(this.transponderId);
    const allocation = new Allocation(this.startFrequency, this.stopFrequency,
      this.powerUsage, this.customerId, this.originatorId, this.allocationName,
      this.allocationId);

    const results = TransponderService.runAllNewAllocationVerifications(transponder.powerLimit,
      transponder.allocations, allocation);

    return results;
  }

}
