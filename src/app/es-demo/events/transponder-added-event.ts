import {EsEvent} from './es-event';
import {Transponder} from "../models/transponder";
import {generateUUID} from "../../app.helpers";

export class TransponderAddedEvent extends EsEvent{
  constructor(
    public transponderName: string,
    public transponderId: string = generateUUID())
  {
      super(null, 'TransponderAddedEvent');
      this.transponder = new Transponder(this.transponderName, this.transponderId);
  }

  process(): Transponder {
    return this.transponder;
  }

}
