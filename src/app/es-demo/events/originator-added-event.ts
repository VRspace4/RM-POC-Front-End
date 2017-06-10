import {generateUUID} from "../../app.helpers";
import {Originator} from "../models/originator";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";

// TODO create ResourceEvent
export class OriginatorAddedEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public originatorName: string,
    public originatorId: string = generateUUID()
  ) {
    super(rootModel, 'OriginatorAddedEvent');
  }

  process(): RootModel {
    const newOriginator = new Originator(this.originatorName, this.originatorId);
    this.rootModel.addOriginator(newOriginator);
    return this.rootModel;
  }

}
