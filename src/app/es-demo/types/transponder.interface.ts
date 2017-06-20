import {Allocation} from "../models/allocation";

export interface ITransponder {
  powerLimit: number;
  bandwidth: number;
  allocations: Allocation[];
}
