import {EsEvent} from "../events/es-event.abstract";
export class BrokerMessage {
  constructor(
    public topic: string,
    public value: EsEvent,
    public offset: number,
    public partition: number,
    public highWaterOffset: number,
    public key: number
  ) {}
}
