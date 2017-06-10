import {Transponder} from "../models/transponder";
import {generateUUID} from "../../app.helpers";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {IRootModel} from "../models/root-model.interface";
import {Customer} from "../models/customer";
import {Originator} from "../models/originator";

export class RootModelAddedEvent extends EsEvent implements IRootModel {
  constructor(
    public rootModel: RootModel,
    public rootModelName: string,
    public rootModelId: string = generateUUID(),
    public transponders: Transponder[] = [],
    public customers: Customer[] = [],
    public originators: Originator[] = []
  ) {
    super(null, 'RootModelAddedEvent');
    this.rootModel = new RootModel(this.rootModelName, this.rootModelId, null,
    this.transponders, this.customers, this.originators);
  }

  process(): RootModel {
    return this.rootModel;
  }

}
