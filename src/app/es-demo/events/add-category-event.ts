import {Catalog} from '../models/catalog';
import {Category} from '../models/category';


export class AddCategoryEvent {
  constructor(
    public catalog: Catalog,
    public categoryId: string,
    public categoryName: string,
    public name: string = 'AddCategoryEvent',
    public parent = null) {}

  public process() {
    this.catalog.addCategory(new Category(this.categoryId, this.categoryName));
  }
}
