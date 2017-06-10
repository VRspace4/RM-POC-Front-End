import {Transponder} from "../models/transponder";
import {generateUUID} from "../../app.helpers";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {ITransponder} from "../models/transponder.interface";
import {Allocation} from "../models/allocation";

export class TransponderAddedEvent extends EsEvent implements ITransponder {
  constructor(
    rootModel: RootModel,
    public transponderName: string,
    public transponderId: string = generateUUID(),
    public powerLimit: number = 100,
    public bandwidth: number = 100,
    public allocations: Allocation[] = []
  ) {
      super(rootModel, 'TransponderAddedEvent');
  }

  process(): RootModel {
    const newTransponder = new Transponder(
      this.transponderName, this.transponderId, this.powerLimit, this.bandwidth,
      this.allocations);
    this.rootModel.addTransponder(newTransponder);
    return this.rootModel;
  }

}
