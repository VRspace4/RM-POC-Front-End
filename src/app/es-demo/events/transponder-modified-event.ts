import {Transponder} from "../models/transponder";
import {EsModificationEvent} from "./es-modification-event";

export class TransponderModifiedEvent extends EsModificationEvent{
  constructor(
    transponder: Transponder,
    key: string[],
    value: string[]
  ) {
    super(transponder, key, value);
  }

  process(): Transponder {
    this.applyModifications(this.transponder);
    return this.transponder;
  }

}
