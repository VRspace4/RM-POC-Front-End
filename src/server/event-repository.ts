import {v1 as neo4j} from 'neo4j-driver';
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {EsEvent} from "../app/es-demo/events/es-event";
import {Transponder} from "../app/es-demo/models/transponder";
import {TransponderModifiedEvent} from "../app/es-demo/events/transponder-modified-event";

const uri = 'bolt://localhost';

const driver = neo4j.driver(uri, neo4j.auth.basic('neo4j', '9colada'));
const session = driver.session();

export class EventRepository {

  static serializeEvent(event: EsEvent) {
    const cloneEvent = JSON.parse(JSON.stringify(event));
    delete cloneEvent.transponder;
    return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
  }

  static deserializeEvent(event: EsEvent, transponder: Transponder): EsEvent {
    switch (event.name) {
      case 'TransponderAddedEvent':
        const newTransponderAddedEvent = <TransponderAddedEvent>event;
        return new TransponderAddedEvent(newTransponderAddedEvent.transponderName,
          newTransponderAddedEvent.transponderId);
      case 'TransponderModifiedEvent':
        const transponderModified = <TransponderModifiedEvent>event;
        return new TransponderModifiedEvent(transponder, transponderModified.key,
          transponderModified.value);
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
    console.log(serializedEvent, command);
    return session.run(command);
  }

  static getChainOfEvents(eventId): Promise<any> {
    const command = `MATCH (x:Event)-[:APPEND*0..]->(e:Event) where ID(e) = ${eventId} RETURN x order by id(x)`;
    console.log(command);
    return new Promise((resolve, reject) => {
      session.run(command).then(result => {
        let transponder: Transponder = null;
        const events: EsEvent[] = result.records.map((record) => {
          const event: EsEvent = this.deserializeEvent(record.get(0).properties, transponder);
          transponder = event.transponder;

          return event;
        });

        resolve(events);
      });
    })
    // });
  }

  static postTransponderCreatedEvent(event) {
    const serializedEvent = this.serializeEvent(event);
  }
}
