import {EsEvent} from './es-event';
import {Transponder} from "../models/transponder";
import {generateUUID} from "../../app.helpers";
import {IAllocation} from "../models/allocation-interface";
import {Allocation} from "../models/allocation";

export class AllocationAddedEvent extends EsEvent implements IAllocation{
  constructor(
    transponder: Transponder,
    public startFrequency: number,
    public stopFrequency: number,
    public powerUsage: number,
    public originatorId: string,
    public name: string = '',
    public id: string = generateUUID())
  {
    super(transponder, 'AllocationAddedEvent');
  }

  process(): Transponder {
    const newAllocation = new Allocation(
      this.startFrequency, this.stopFrequency, this.powerUsage,
      this.originatorId, this.name, this.id);

    this.transponder.addAllocation(newAllocation);
    return this.transponder;
  }

}
