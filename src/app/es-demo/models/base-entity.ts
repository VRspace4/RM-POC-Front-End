import {generateUUID} from "../../app.helpers";
import {VerificationOutput} from "../types/verification-output";
import {RootModel} from "./root-model";
export abstract class BaseEntity {
  public id: string;

  constructor(
    public name: string,
    id: string
  ) {
    if (id === null || id === '') {
      this.id = generateUUID();
    } else {
      this.id = id;
    }
  }

  // TODO To test
  protected getEntity(entityId: string, entities: BaseEntity[]): BaseEntity {
    const matchedEntity: BaseEntity = entities
      .find((entity: BaseEntity) => entity.id === entityId);
    if (matchedEntity === null) {
      throw new Error('The entity with the name and id, [' + entityId + '], ' +
        'does not exist!');
    }
    return matchedEntity;
  }

  protected getEntityIndex(entityId: string, entities: BaseEntity[]): number {
    const entityIndex: number = entities
      .findIndex((entity: BaseEntity) => entity.id === entityId);
    if (entityIndex < 0) {
      throw new Error('The entity with id, [' + entityId + '], ' +
        'does not exist!');
    }
    return entityIndex;
  }

  protected addEntity(newEntity: BaseEntity, entities: BaseEntity[]): void {
    entities.push(newEntity);
  }

  protected removeEntity(entityId: string, entities: BaseEntity[]) {
    const entityIndex: number = this.getEntityIndex(entityId, entities);
    if (entityIndex >= 0) {
      entities.splice(entityIndex, 1);
    }
  }

  public verifyEntityNameDuplication(rootModel: RootModel, entities: BaseEntity[]): VerificationOutput {
    const result = new VerificationOutput();

    for (const entity of entities) {
      if (this.name === entity.name) {
        result.passed = false;
        result.failedMessage = `There's already an entity with the same name, ${entity.name}. Please choose another name.`;
        break;
      }
    }
    return result;
  }

  public verifyEntityIdDuplication(rootModel: RootModel, entities: BaseEntity[]): VerificationOutput {
    const result = new VerificationOutput();

    for (const entity of entities) {
      if (this.id === entity.id) {
        result.passed = false;
        result.failedMessage = `There's already an entity with the same ID, ${entity.id}!`;
        break;
      }
    }
    return result;
  }

}
