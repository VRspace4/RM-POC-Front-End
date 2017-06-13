import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {VerificationOutput} from "../models/verification-output";
import {Originator} from "../models/originator";
import {RmEventType} from "../../app.globals";

export class OriginatorRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public originatorId: string
  ) {
    super(rootModel, RmEventType[RmEventType.OriginatorRemovedEvent]);
  }
  process(): RootModel {
    this.throwIfVerificationFails();
    this.rootModel.removeOriginator(this.originatorId);
    return this.rootModel;
  }

  verifyProcess(): VerificationOutput[] {
    const originatorToBeRemoved = this.rootModel.getOriginator(this.originatorId);
    const result = originatorToBeRemoved.verifyDeletion(this.rootModel);
    return [result];
  }


}
