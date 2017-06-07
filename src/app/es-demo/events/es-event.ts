import {Transponder} from "../models/transponder";
export abstract class EsEvent {
  constructor(
    public transponder: Transponder,
    public name: string,
    public parent: number = null
  ) {}

  abstract process(): Transponder;
}
