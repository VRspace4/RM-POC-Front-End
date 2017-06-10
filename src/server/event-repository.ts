import {v1 as neo4j} from 'neo4j-driver';
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {EsEvent} from "../app/es-demo/events/es-event.abstract";
import {Transponder} from "../app/es-demo/models/transponder";
import {TransponderModifiedEvent} from "../app/es-demo/events/transponder-modified-event";
import {CustomerAddedEvent} from "../app/es-demo/events/customer-added-event";
import {CustomerModifiedEvent} from "../app/es-demo/events/customer-modified-event";
import {AllocationAddedEvent} from "../app/es-demo/events/allocation-added-event";
import {AllocationModifiedEvent} from "../app/es-demo/events/allocation-modified-event";
import {RootModel} from "../app/es-demo/models/root-model";

const uri = 'bolt://localhost';

const driver = neo4j.driver(uri, neo4j.auth.basic('neo4j', '9colada'));
const session = driver.session();

export class EventRepository {

  static getNodeIdFromCmdOutput(cmdOutput: any): number {
    if (cmdOutput === null) {
      throw new Error('The input neo4j command output should not be empty!');
    }
    return parseInt(cmdOutput.records[0].get(0).identity.low, 10);
  }

  static serializeEvent(event: EsEvent): string {
    const cloneEvent = JSON.parse(JSON.stringify(event));
    delete cloneEvent.transponder;
    return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
  }

  static deserializeEvent(event: EsEvent, rootModel: RootModel): EsEvent {
    switch (event.name) {
      case 'TransponderAddedEvent':
        const transponderAddedEvent = <TransponderAddedEvent>event;
        return new TransponderAddedEvent(rootModel, transponderAddedEvent.transponderName,
          transponderAddedEvent.transponderId);
      case 'TransponderModifiedEvent':
        const transponderModifiedEvent = <TransponderModifiedEvent>event;
        return new TransponderModifiedEvent(rootModel, transponderModifiedEvent.transponderId,
          transponderModifiedEvent.key, transponderModifiedEvent.value);
      case 'CustomerAddedEvent':
        const customerAddedEvent = <CustomerAddedEvent>event;
        return new CustomerAddedEvent(rootModel, customerAddedEvent.customerName,
          customerAddedEvent.customerId);
      case 'CustomerModifiedEvent':
        const customerModifiedEvent = <CustomerModifiedEvent>event;
        return new CustomerModifiedEvent(rootModel, customerModifiedEvent.customerId,
          customerModifiedEvent.key, customerModifiedEvent.value);
      case 'AllocationAddedEvent':
        const allocationAddedEvent = <AllocationAddedEvent>event;
        return new AllocationAddedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.startFrequency,
          allocationAddedEvent.stopFrequency, allocationAddedEvent.powerUsage, allocationAddedEvent.customerId,
          allocationAddedEvent.originatorId, allocationAddedEvent.allocationName,
          allocationAddedEvent.allocationId);
      case 'AllocationModifiedEvent':
        const allocationModifiedEvent = <AllocationModifiedEvent>event;
        return new AllocationModifiedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.allocationId,
          allocationModifiedEvent.key, allocationModifiedEvent.value);
    }
  }

  static processEvent(event: EsEvent, parentId: number): Promise<number> {
    let promise: Promise<number>;
    if (parentId) {
      promise = this.appendEvent(event, parentId);
    } else {
      promise = this.createNewTransponderEvent(<TransponderAddedEvent>event);
    }

    return new Promise((resolve, reject) => {
      promise.then((result: any) => {
        const eventId = result.records[0].get(0).identity.low;
        console.log('eventId = ', eventId);
        resolve(eventId);
      });
    });
  }

  static appendEvent(event: EsEvent, parentId) {
    const serializedEvent = EventRepository.serializeEvent(event);
    const command = `MATCH (parent:Event) where ID(parent) = ${parentId} 
      CREATE (parent)-[r:APPEND {parentId: ${parentId}}]->(e:Event ${serializedEvent}) RETURN e`;

    return session.run(command);
  }

  static createNewTransponderEvent(newTransponderAddedEvent: TransponderAddedEvent) {
    const serializedEvent = this.serializeEvent(newTransponderAddedEvent);
    const command = `CREATE (e:Event ${serializedEvent}) RETURN e`;
    return session.run(command);
  }

  // static delete

  static getChainOfEvents(eventId): Promise<any> {
    const command = `MATCH (x:Event)-[:APPEND*0..]->(e:Event) where ID(e) = ${eventId} RETURN x order by id(x)`;
    console.log(command);
    return new Promise((resolve, reject) => {
      session.run(command).then(result => {
        let rootModel: RootModel;

        const events: EsEvent[] = result.records.map((record) => {
          const event: EsEvent = this.deserializeEvent(record.get(0).properties, rootModel);
          rootModel = event.rootModel;

          return event;
        });

        resolve(events);
      });
    });
  }

  static postTransponderCreatedEvent(event) {
    const serializedEvent = this.serializeEvent(event);
  }
}
