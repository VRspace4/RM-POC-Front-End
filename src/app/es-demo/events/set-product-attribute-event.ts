import {Catalog} from "../models/catalog";
export class SetProductAttributeEvent {
  constructor(
    public catalog: Catalog,
    public productId: string,
    public key: string,
    public value: string,
    public name: string = 'SetProductAttributeEvent',
    public parent = null
  ) {}

  process() {
    const product = this.catalog.getProduct(this.productId);
    product[this.key] = this.value;
  }
}
