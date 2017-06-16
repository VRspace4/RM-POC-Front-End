import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Transponder} from "../models/transponder";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class TransponderModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public transponderId: string,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value, RmEventType[RmEventType.TransponderModifiedEvent]);
  }
  process(): RootModel {
    this.throwIfVerificationFails();
    const transponderToChange: Transponder = this.rootModel.getTransponder(this.transponderId);
    this.applyModifications(transponderToChange);
    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    const results: VerificationOutput[] = [];
    results.push(this.verifyKeysAndValues(new Transponder('abc')));
    results.push(this.verifyNameIdConflicts(this.rootModel.transponders));
    return results;
  }
}
