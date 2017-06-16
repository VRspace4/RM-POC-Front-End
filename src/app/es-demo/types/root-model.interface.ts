import {Transponder} from "../models/transponder";
import {Customer} from "../models/customer";
import {Originator} from "../models/originator";

export interface IRootModel {
  transponders: Transponder[];
  customers: Customer[];
  originators: Originator[];
}
