import {Transponder} from "./transponder";
import {Customer} from "./customer";
import {Originator} from "./originator";

export interface IRootModel {
  transponders: Transponder[];
  customers: Customer[];
  originators: Originator[];
}
