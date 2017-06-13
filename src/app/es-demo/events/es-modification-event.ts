import {BaseEntity} from "../models/base-entity";
import {EsEvent} from "./es-event.abstract";
import {RootModel} from "../models/root-model";
import {VerificationOutput} from "../models/verification-output";
import {RmEventType} from "../../app.globals";

export abstract class EsModificationEvent extends EsEvent {
  constructor(
    rootModel: RootModel,
    public keys: string[],
    public values: string[],
    name: string
  ) {
    super(rootModel, name);
  }

  public applyModifications(entity: BaseEntity): void {
    this.keys.forEach((keyItem, index) => {
      if (entity.hasOwnProperty(keyItem)) {
        entity[keyItem] = this.values[index];
      } else {
        throw new Error('The property, ' + keyItem + ', does not exist!');
      }
    });
  }

  // 1. Make sure the propose name and ID modifications don't conflict with existing
  public verifyNameIdConflicts(entities: BaseEntity[]): VerificationOutput {
    const result = new VerificationOutput();

    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i].endsWith('name') && this.keys[i] !== 'name') {
        const newName = this.values[i];
        // Traverse through all the entities
        for (const entity of entities) {
          const propertyName = this.keys[i];
          // Does it already have the same name?
          if (entity[propertyName] === this.values[i]) {
            result.passed = false;
            result.failedMessage = 'The proposed name change conflicts with another ' +
              'existing entity of the same type!';
            break;
          }
        }
      }
    }

    return result;
  }

  public verifyKeysAndValues(entity: BaseEntity): VerificationOutput {
    const result = new VerificationOutput();

    for (let index = 0; index < this.keys.length; index++) {
      if (entity.hasOwnProperty(this.keys[index]) === false) {
        result.passed = false;
        result.failedMessage = `Invalid command - the property, ${this.keys[index]}, does not exist!`;
        break;
      } else if (typeof entity[this.keys[index]] === 'number') {
        const testParseInt = parseInt(entity[this.keys[index]], 10);
        if (testParseInt === NaN) {
          result.passed = false;
          result.failedMessage = `Invalid command - the numerical property, \
            ${this.keys[index]}, expects a number for instead got, \
            ${this.values[index]}`;
          break;
        }
      }
    }

    return result;
  }
}
