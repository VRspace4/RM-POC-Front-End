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
import {RootModelAddedEvent} from "../app/es-demo/events/root-model-added-event";
import {RootModelModifiedEvent} from "../app/es-demo/events/root-model-modified-event";
import {OriginatorAddedEvent} from "../app/es-demo/events/originator-added-event";
import {OriginatorModifiedEvent} from "../app/es-demo/events/originator-modified-event";
import {TransponderRemovedEvent} from "../app/es-demo/events/transponder-removed-event";
import {CustomerRemovedEvent} from "../app/es-demo/events/customer-removed-event";
import {OriginatorRemovedEvent} from "../app/es-demo/events/originator-removed-event";
import {AllocationRemovedEvent} from "../app/es-demo/events/allocation-removed-event";

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
    delete cloneEvent.rootModel;
    return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
  }

  static deserializeEvent(event: EsEvent, rootModel: RootModel): EsEvent {
    switch (event.name) {

      case 'RootModelAddedEvent':
        const rootModelAddedEvent = <RootModelAddedEvent>event;
        return new RootModelAddedEvent(rootModel, rootModelAddedEvent.rootModelName,
          rootModelAddedEvent.rootModelId, rootModelAddedEvent.transponders,
          rootModelAddedEvent.customers, rootModelAddedEvent.originators);

      case 'RootModelModifiedEvent':
        const rootModelModifiedEvent = <RootModelModifiedEvent>event;
        return new RootModelModifiedEvent(rootModel,
          rootModelModifiedEvent.key, rootModelModifiedEvent.value);

      case 'TransponderAddedEvent':
        const transponderAddedEvent = <TransponderAddedEvent>event;
        return new TransponderAddedEvent(rootModel, transponderAddedEvent.transponderName,
          transponderAddedEvent.transponderId);

      case 'TransponderModifiedEvent':
        const transponderModifiedEvent = <TransponderModifiedEvent>event;
        return new TransponderModifiedEvent(rootModel, transponderModifiedEvent.transponderId,
          transponderModifiedEvent.key, transponderModifiedEvent.value);

      case 'TransponderRemovedEvent':
        const transponderRemovedEvent = <TransponderRemovedEvent>event;
        return new TransponderRemovedEvent(rootModel, transponderRemovedEvent.transponderId);

      case 'CustomerAddedEvent':
        const customerAddedEvent = <CustomerAddedEvent>event;
        return new CustomerAddedEvent(rootModel, customerAddedEvent.customerName,
          customerAddedEvent.customerId);

      case 'CustomerModifiedEvent':
        const customerModifiedEvent = <CustomerModifiedEvent>event;
        return new CustomerModifiedEvent(rootModel, customerModifiedEvent.customerId,
          customerModifiedEvent.key, customerModifiedEvent.value);

      case 'CustomerRemovedEvent':
        const customerRemovedEvent = <CustomerRemovedEvent>event;
        return new CustomerRemovedEvent(rootModel, customerRemovedEvent.customerId);

      case 'OriginatorAddedEvent':
        const originatorAddedEvent = <OriginatorAddedEvent>event;
        return new OriginatorAddedEvent(rootModel, originatorAddedEvent.originatorName,
          originatorAddedEvent.originatorId);

      case 'OriginatorModifiedEvent':
        const originatorModifiedEvent = <OriginatorModifiedEvent>event;
        return new OriginatorModifiedEvent(rootModel, originatorModifiedEvent.originatorId,
          originatorModifiedEvent.key, originatorModifiedEvent.value);

      case 'OriginatorRemovedEvent':
        const originatorRemovedEvent = <OriginatorRemovedEvent>event;
        return new OriginatorRemovedEvent(rootModel, originatorRemovedEvent.originatorId);

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

      case 'AllocationRemovedEvent':
        const allocationRemovedEvent = <AllocationRemovedEvent>event;
        return new AllocationRemovedEvent(rootModel, allocationRemovedEvent.transponderId,
          allocationRemovedEvent.allocationId);

      default:
        throw new Error('The event named, [' + event.name + '], has no handler. ' +
          'Please report this error.');
    }
  }

  static processEvent(event: EsEvent, parentId: number): Promise<number> {
    let promise: Promise<number>;
    if (parentId) {
      promise = this.appendEvent(event, parentId);
    } else {
      promise = this.createNewRootModelEvent(<TransponderAddedEvent>event);
    }

    return new Promise((resolve, reject) => {
      promise.then((result: any) => {
        const eventId = result.records[0].get(0).identity.low;
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

  static createNewRootModelEvent(newTransponderAddedEvent: TransponderAddedEvent) {
    const serializedEvent = this.serializeEvent(newTransponderAddedEvent);
    const command = `CREATE (e:Event ${serializedEvent}) RETURN e`;
    return session.run(command);
  }

  // static delete

  static getChainOfEvents(eventId): Promise<any> {
    const command = `MATCH (x:Event)-[:APPEND*0..]->(e:Event) where ID(e) = ${eventId} RETURN x order by id(x)`;
    return new Promise((resolve, reject) => {
      session.run(command).then(result => {
        let rootModel: RootModel;

        const events: EsEvent[] = result.records.map((record) => {
          const event: EsEvent = this.deserializeEvent(record.get(0).properties, rootModel);
          rootModel = event.rootModel;

          return event;
        });

        resolve(events);
      }).catch((e) => {
        reject(e);
      });
    });
  }

}
