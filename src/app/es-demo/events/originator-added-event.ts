import {generateUUID} from "../../app.helpers";
import {Originator} from "../models/originator";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class OriginatorAddedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public originatorName: string,
    public originatorId: string = generateUUID()
  ) {
    super(rootModel, RmEventType[RmEventType.OriginatorAddedEvent]);
    this.originatorId = this.ifEmptyGenerateUUID(originatorId);

  }

  public process(): RootModel {
    this.throwIfVerificationFails();
    const newOriginator = new Originator(this.originatorName, this.originatorId);
    this.rootModel.addOriginator(newOriginator);
    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    // Make sure originatorName is valid
    result = this.checkIfValidBasicValue<string>(this.originatorName, 'Originator Name');
    if (result.passed === false) {
      return result;
    }

    // Verify process()
    const verifyProcessResults = this.verifyProcess();
    const combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);

    return combinedVerifyProcessResults;
  }

  protected verifyProcess(): VerificationOutput[] {
    const originatorToBeAdded = new Originator(this.originatorName, this.originatorId);
    const result = originatorToBeAdded.verifyEntityNameDuplication(this.rootModel, this.rootModel.originators);
    return [result];
  }

}
