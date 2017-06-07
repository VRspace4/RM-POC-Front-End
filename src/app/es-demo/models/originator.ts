import {BaseEntity} from "./base-entity";
import {generateUUID} from "../../app.helpers";

export class Originator extends BaseEntity {
  constructor (
    name: string,
    id: string = generateUUID()
  )
  {
    super(name, id);
  }
}
