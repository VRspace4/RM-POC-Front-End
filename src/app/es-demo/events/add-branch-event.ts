import {Catalog} from "../models/catalog";
export class AddBranchEvent {
  constructor(
    public catalog: Catalog,
    public branchName: string,
    public name: string = 'AddBranchEvent',
    public parent = null
  ) {}

  process() {

  }
}
