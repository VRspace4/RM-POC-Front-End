import { Category } from './category';

export class Product {
  constructor(private _id: string,
              private _name: string,
              private _price: number,
              private _visible: boolean,
              private _color: string,
              private _categoryId: string) {}

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

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  set categoryId(value: string) {
    this._categoryId = value;
  }
}
