import {BaseEntity} from "../models/base-entity";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";

export abstract class EsModificationEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public key: string[],
    public value: string[]
  ) {
    super(rootModel, 'TransponderModified');
  }

  applyModifications(entity: BaseEntity): void {
    this.key.forEach((keyItem, index) => {
      if (entity.hasOwnProperty(keyItem)) {
        entity[keyItem] = this.value[index];
      } else {
        throw new Error('The property, ' + keyItem + ', does not exist!');
      }
    });
  }
}
