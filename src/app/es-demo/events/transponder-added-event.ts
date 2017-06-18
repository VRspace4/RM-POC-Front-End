import {Transponder} from "../models/transponder";
import {generateUUID} from "../../app.helpers";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {ITransponder} from "../types/transponder.interface";
import {Allocation} from "../models/allocation";
import {VerificationOutput} from "../types/verification-output";
import {RmEventType} from "../../app.globals";

export class TransponderAddedEvent extends EsEvent implements ITransponder {
  constructor(
    rootModel: RootModel,
    public transponderName: string,
    public transponderId: string = generateUUID(),
    public powerLimit: number = 100,
    public bandwidth: number = 100,
    public allocations: Allocation[] = []
  ) {
    super(rootModel, RmEventType[RmEventType.TransponderAddedEvent]);
    this.transponderId = this.ifEmptyGenerateUUID(transponderId);

  }

  public process(): RootModel {
    this.throwIfVerificationFails();
    const newTransponder = new Transponder(
      this.transponderName, this.transponderId, this.powerLimit, this.bandwidth,
      this.allocations);
    this.rootModel.addTransponder(newTransponder);
    return this.rootModel;
  }

  public verifyEvent(): VerificationOutput {
    let result = new VerificationOutput();

      // Make sure transponderName is valid
      result = this.checkIfValidBasicValue<string>(this.transponderName);
      if (result.passed === false) {
        return result;
      }

      // Verify process()
      const verifyProcessResults = this.verifyProcess();
      result = this.combineAllVerifications(verifyProcessResults);

    return result;
  }


  protected verifyProcess(): VerificationOutput[] {
    const transponderToBeAdded = new Transponder(this.transponderName, this.transponderId,
      this.powerLimit, this.bandwidth, this.allocations);

    const result = transponderToBeAdded.verifyEntityNameDuplication(this.rootModel,
      this.rootModel.transponders);

    return [result];
  }

}
