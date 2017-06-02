import {Product} from "../models/product";
import {Catalog} from "../models/catalog";
import {Category} from "../models/category";

export class AddProductEvent {
  constructor(
    public catalog: Catalog,
    public productId: string,
    public productName: string,
    public productPrice: number,
    public productVisible: boolean,
    public productColor: string,
    public productCategoryId: string,
    public name: string = 'AddProductEvent',
    public parent: any = null) {}

  process() {
    this.catalog.addProduct(new Product(this.productId, this.productName,
      this.productPrice, this.productVisible, this.productColor, this.productCategoryId));
  }
}
