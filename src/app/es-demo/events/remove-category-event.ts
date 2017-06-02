import {Catalog} from "../models/catalog";
export class RemoveCategoryEvent {
  constructor(
    public catalog: Catalog,
    public categoryId: string,
    public name = 'RemoveCategoryEvent',
    public parent = null) {}
}
