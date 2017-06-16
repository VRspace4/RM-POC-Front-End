import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {RmEventType} from "../../app.globals";
import {VerificationOutput} from "../types/verification-output";

export class TransponderRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string
  ) {
    super(rootModel, RmEventType[RmEventType.TransponderRemovedEvent]);
  }

  process(): RootModel {
    this.throwIfVerificationFails();
    this.rootModel.removeTransponder(this.transponderId);
    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    const result = new VerificationOutput();
    return [result]; // nothing to verify
  }
}
