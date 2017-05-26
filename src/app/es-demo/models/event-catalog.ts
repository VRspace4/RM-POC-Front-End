export class CatalogEvent {
  constructor(private _catalogName: string,
    private _catalogId: string,
    private _name: string,
    private _id: number) {}

  get catalogName(): string {
    return this._catalogName;
  }

  set catalogName(value: string) {
    this._catalogName = value;
  }

  get catalogId(): string {
    return this._catalogId;
  }

  set catalogId(value: string) {
    this._catalogId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
