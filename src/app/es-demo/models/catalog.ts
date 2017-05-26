import { Category } from './category';
import { Product } from './product';

export class Catalog {
  private _eventId: number;

  constructor(private _id: string,
              private _name: string,
              private _categories: Category[] = [],
              private _products: Product[] = []) {}
  get eventId(): number {
    return this._eventId;
  }

  set eventId(value: number) {
    this._eventId = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get categories(): Category[] {
    return this._categories;
  }

  set categories(value: Category[]) {
    this._categories = value;
  }

  get products(): Product[] {
    return this._products;
  }

  set products(value: Product[]) {
    this._products = value;
  }

  public addCategory(category: Category): void {
    this._categories.push(category);
  }

  public addProduct(product: Product): void {
    this._products.push(product);
  }

  public removeProduct(productId: string): void {
    const index: number = this._products.findIndex((product: Product) => product.id === productId);

    if (index >= 0) {
      this._products.splice(index, 1);
    }
  }

  public getCategory(categoryId: string): Category {
    return this._categories.find((category: Category) => category.id === categoryId);
  }
}
