import {BaseEntity} from "./base-entity";
import {Transponder} from "./transponder";
import {Customer} from "./customer";
import {Originator} from "./originator";

export class RootModel extends BaseEntity {
  constructor(
    name: string,
    id: string = null,
    public eventId: number = null,
    public transponders: Transponder[] = [],
    public customers: Customer[] = [],
    public originators: Originator[] = []
  ) {
    super(name, id);
  }

  /**************** Transponder **********************/

  public addTransponder(newTransponder: Transponder): void {
    this.addEntity(newTransponder, this.transponders);
  }

  public getTransponder(transponderId: string): Transponder {
    return <Transponder>this.getEntity(transponderId, this.transponders);
  }

  public getTransponderIndex(transponderId: string): number {
    return this.getEntityIndex(transponderId, this.transponders);
  }

  public removeTransponder(transponderId: string): void {
    this.removeEntity(transponderId, this.transponders);
  }

  /**************** Customers **********************/

  public addCustomer(newCustomer: Customer): void {
    this.addEntity(newCustomer, this.customers);
  }

  public getCustomer(customerId: string): Customer {
    return <Customer>this.getEntity(customerId, this.customers);
  }

  public getCustomerIndex(customerId: string): number {
    return this.getEntityIndex(customerId, this.customers);
  }

  public removeCustomer(customerId: string): void {
    this.removeEntity(customerId, this.customers);
  }

  /**************** Originators **********************/

  public addOriginator(newOriginator: Originator): void {
    this.addEntity(newOriginator, this.originators);
  }

  public getOriginator(originatorId: string): Originator {
    return <Originator>this.getEntity(originatorId, this.originators);
  }

  public getOriginatorIndex(originatorId: string): number {
    return this.getEntityIndex(originatorId, this.originators);
  }

  public removeOriginator(originatorId: string): void {
    this.removeEntity(originatorId, this.originators);
  }
}
