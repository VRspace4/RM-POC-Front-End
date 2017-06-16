import {Customer} from "./customer";
import {Allocation} from "./allocation";
import {BaseEntity} from "./base-entity";
import {generateUUID} from "../../app.helpers";
import {TransponderService} from "../services/transponder.service";
import {ITransponder} from "../types/transponder.interface";

export class Transponder extends BaseEntity implements ITransponder {
  constructor(
    name: string,
    id: string = null,
    public powerLimit: number = 100, // W
    public bandwidth: number = 100, // Ghz
    public allocations: Allocation[] = []
  ) {
    super(name, id);
  }

  public getAllocation(allocationId: string): Allocation {
    const entity = this.getEntity(allocationId, this.allocations);
    return <Allocation>entity;
  }

  public addAllocation(allocation: Allocation) {
    if (TransponderService.runAllNewAllocationVerifications(this.powerLimit,
        this.allocations, allocation)) {
      this.addEntity(allocation, this.allocations);
    }
  }

  public removeAllocation(allocationId: string) {
    this.removeEntity(allocationId, this.allocations);
  }

}
