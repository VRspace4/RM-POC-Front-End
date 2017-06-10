import {Allocation} from "./allocation";

export interface ITransponder {
  powerLimit: number;
  bandwidth: number;
  allocations: Allocation[];
}
