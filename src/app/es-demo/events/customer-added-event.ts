import {EsEvent} from './es-event';
import {Transponder} from "../models/transponder";
import {generateUUID} from "../../app.helpers";
import {Customer} from "../models/customer";

export class CustomerAddedEvent extends EsEvent{
  constructor(
    transponder: Transponder,
    public name: string,
    public id: string = generateUUID())
  {
    super(transponder, 'CustomerAddedEvent');
  }

  process(): Transponder {
    this.transponder.addCustomer(new Customer(this.name, this.id));
    return this.transponder;
  }

}
