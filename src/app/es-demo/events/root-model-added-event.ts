import {Transponder} from "../models/transponder";
import {generateUUID} from "../../app.helpers";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {IRootModel} from "../types/root-model.interface";
import {Customer} from "../models/customer";
import {Originator} from "../models/originator";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";
//
export class RootModelAddedEvent extends EsEvent implements IRootModel {
  constructor(
    public rootModel: RootModel,
    public rootModelName: string,
    public rootModelId: string = generateUUID(),
    public transponders: Transponder[] = [],
    public customers: Customer[] = [],
    public originators: Originator[] = []
  ) {
    super(null, RmEventType[RmEventType.RootModelAddedEvent]);
    this.rootModelId = this.ifEmptyGenerateUUID(rootModelId);
    const newRootModel = new RootModel(this.rootModelName, this.rootModelId, null,
      this.transponders, this.customers, this.originators);

    const copyResults = newRootModel.copyPropertiesTo(rootModel);
    if (copyResults.passed === false) {
      throw new Error(`Unable to apply new root model. ${copyResults.failedMessage}`);
    }
  }
  public process(): RootModel {
    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

    // Make sure rootModelName is valid
    result = this.checkIfValidBasicValue<string>(this.rootModelName);
    if (result.passed === false) {
      return result;
    }

    // Verify process()
    const verifyProcessResults = this.verifyProcess();
    const combinedVerifyProcessResults = this.combineAllVerifications(verifyProcessResults);

    return combinedVerifyProcessResults;
  }


  public verifyProcess(): VerificationOutput[] {
    return [new VerificationOutput()]; // nothing to verify
  }



}
