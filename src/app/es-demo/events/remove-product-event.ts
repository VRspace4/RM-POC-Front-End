import {Catalog} from "../models/catalog";
export class RemoveProductEvent {
  constructor(
    public catalog: Catalog,
    public productId: string,
    public name: string = 'RemoveProductEvent',
    public parent: any = null) {}

  process() {
    this.catalog.removeProduct(this.productId);
    console.log("RemoveProductEvent's process()");
  }
}
