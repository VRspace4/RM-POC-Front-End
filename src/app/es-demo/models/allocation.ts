import {BaseEntity} from "./base-entity";
import {generateUUID} from "../../app.helpers";
import {IAllocation} from "./allocation-interface";

export class Allocation extends BaseEntity implements IAllocation {
  constructor(public startFrequency: number,
              public stopFrequency: number,
              public powerUsage: number,
              public customerId: string,
              public originatorId: string,
              name: string = '',
              id: string = '') {
    super(name, id);
  }
}
