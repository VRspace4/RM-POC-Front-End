import {RootModel} from "../models/root-model";
import {EsEvent} from "./es-event.abstract";
import {VerificationOutput} from "../types/verification-output";
import {Originator} from "../models/originator";
import {RmEventType} from "../../app.globals";

export class OriginatorRemovedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public originatorId: string
  ) {
    super(rootModel, RmEventType[RmEventType.OriginatorRemovedEvent]);
  }

  public process(): RootModel {
    this.throwIfVerificationFails();
    this.rootModel.removeOriginator(this.originatorId);
    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    // Make sure originatorId exists
    const originatorIndex = this.rootModel.getTransponderIndex(this.originatorId);
    result = this.checkIfIdExists(this.originatorId, originatorIndex , 'originator ID');
    if (result.passed === false) {
      return result;
    }

    // Verify process()
    const verifyProcessResults = this.verifyProcess();
    const combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);

    return combinedVerifyProcessResults;
  }


  public verifyProcess(): VerificationOutput[] {
    const originatorToBeRemoved = this.rootModel.getOriginator(this.originatorId);
    const result = originatorToBeRemoved.verifyDeletion(this.rootModel);
    return [result];
  }


}
