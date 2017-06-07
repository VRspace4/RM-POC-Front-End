import {Transponder} from "../models/transponder";
import {EsEvent} from "./es-event";
import {BaseEntity} from "../models/base-entity";

export abstract class EsModificationEvent extends EsEvent{
  constructor(
    transponder: Transponder,
    public key: string[],
    public value: string[]
  ) {
    super(transponder, 'TransponderModified');
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
