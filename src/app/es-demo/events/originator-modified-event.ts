import {EsModificationEvent} from "./es-modification-event";
import {RootModel} from "../models/root-model";
import {Originator} from "../models/originator";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class OriginatorModifiedEvent extends EsModificationEvent {
  constructor(
    rootModel: RootModel,
    public originatorId: string,
    key: string[],
    value: string[]
  ) {
    super(rootModel, key, value, RmEventType[RmEventType.OriginatorModifiedEvent]);
  }
  process(): RootModel {
    this.throwIfVerificationFails();
    const originatorToChange: Originator = this.rootModel.getOriginator(this.originatorId);
    this.applyModifications(originatorToChange);
    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    const originatorToBeModified = this.rootModel.getOriginator(this.originatorId);
    const results: VerificationOutput[] = [];

    results.push(originatorToBeModified.verifyEntityNameDuplication(this.rootModel,
      this.rootModel.originators));

    results.push(this.verifyKeysAndValues(originatorToBeModified));
    results.push(this.verifyNameIdConflicts(this.rootModel.originators));

    return results;
  }


}
