import {RootModel} from "../models/root-model";
export abstract class EsEvent {
  constructor(
    public rootModel: RootModel,
    public name: string,
    public parent: number = null
  ) {}

  abstract process(): RootModel;
}
