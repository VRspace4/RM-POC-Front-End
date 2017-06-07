import {Customer} from "./customer";
import {Allocation} from "./allocation";
import {BaseEntity} from "./base-entity";
import {generateUUID} from "../../app.helpers";

export class Transponder extends BaseEntity {
  constructor(
    name: string,
    id: string = generateUUID(),
    public eventId: number = null,
    public powerLimit: number = 100, // W
    public bandwidth: number = 100, // Ghz
    public customers: Customer[] = [],
    public allocations: Allocation[] = []
  )
  {
    super(name, id);
  }

  public getCustomer(customerId: string): Customer {
    return this.customers.find((customer: Customer) => customer.id === customerId);
  }

  public addCustomer(customer: Customer) {
    this.customers.push(customer);
  }

  public removeCustomer(customerId: string) {
    const index = this.customers.findIndex((customer: Customer) => customer.id === customerId);

    if (index >= 0) {
      this.customers.splice(index, 1);
    }
  }

  public getAllocation(allocationId: string): Allocation {
    return this.allocations.find((allocation: Allocation) => allocation.id === allocationId);
  }

  public addAllocation(allocation: Allocation) {
    
    this.allocations.push(allocation);
  }

  public removeAllocation(allocationId: string) {
    const index = this.allocations.findIndex((allocation: Allocation) => allocation.id === allocationId);

    if (index >= 0) {
      this.allocations.splice(index, 1);
    }
  }
}
