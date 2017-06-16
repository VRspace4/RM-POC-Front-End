import {EsEvent} from "../events/es-event.abstract";
export class EventAndMsgOffset {
  constructor(
    public event: EsEvent,
    public msgOffset: number
  ) {}
}
