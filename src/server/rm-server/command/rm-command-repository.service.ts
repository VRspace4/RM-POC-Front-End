import {v1 as neo4j} from 'neo4j-driver';
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";
import {Neo4jGlobals} from "../../../app/app.globals";
import {RootModel} from "../../../app/es-demo/models/root-model";
import {RmCommandController} from "./rm-command-controller.service";
import {RmCommonController} from "../rm-common-controller.service";
import {RootModelAddedEvent} from "../../../app/es-demo/events/root-model-added-event";

const uri = 'bolt://localhost';

export class RmCommandRepository {
  static _session = neo4j.driver(uri, neo4j.auth.basic('neo4j', '9colada')).session();

  /**
   * Gets the production path of all events and not any of the branch paths.
   * Requires that there exist the property 'productionRootModelId' in the RM-Demo
   * Data node.
   */
  static getProductionEventChain(): Promise<EsEvent[]> {
    const command = `MATCH (rmData:Data{name: '${Neo4jGlobals.rmDemoDataName}'}),
        p=(:Event { name:'RootModelAddedEvent', rootModelId: rmData.${Neo4jGlobals.productionRootModelName} })-[:APPEND*]->(:Event), 
        (without:Event { name:'BranchAddedEvent' })
        WHERE NONE (x IN nodes(p) WHERE x=without)RETURN p`;

    return new Promise((resolve, reject) => {
      RmCommandRepository._session.run(command).then(result => {
        let rootModel: RootModel;
        const events: EsEvent[] = [];

        if (result.records.length > 0) {
          // Deserialize root event
          const rootEvent = RmCommonController.deserializeEvent(result.records[0].get(0).start.properties,
            rootModel);

          if (rootEvent instanceof RootModelAddedEvent) {
            rootModel = rootEvent.rootModel;
            events.push(rootEvent);

            let fieldLength = 0;

            for (const record of result.records) {
              if (fieldLength < record.get(0).length) {
                fieldLength++;
                const event: EsEvent = RmCommonController.deserializeEvent(record.get(0).end.properties, rootModel);
                event.rootModel = rootModel;
                events.push(event);
              } else {
                break;
              }
            }

            resolve(events);
          } else {
            reject(new Error('The first event in the chain is NOT RootModelAddedEvent!'));
          };
        } else {
          reject(new Error('Expected to receive at least one event but got none instead!'));
        };
      }).catch((e) => {
        reject(e);
      });
    });
  }

  static ensureNodeExist(eventName: string): Promise<any> {
    const command = `MERGE (n:Event {name: '${eventName}'}) RETURN n`;
    return this._session.run(command);
  }

  static getProductionRootModelId(): Promise<string> {
    const command = `MATCH (n:Data) WHERE n.name = '${Neo4jGlobals.rmDemoDataName}' RETURN n.${Neo4jGlobals.productionRootModelName}`;
    return new Promise((resolve, reject) => {
      this._session.run(command).then(result => {
        const rootModelId: string = result.records[0].get(0);
        resolve(rootModelId);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  static getChainOfEvents(eventId): Promise<any> {
    const command = `MATCH (x:Event)-[:APPEND*0..]->(e:Event) where ID(e) = ${eventId} RETURN x order by id(x)`;
    return new Promise((resolve, reject) => {
      this._session.run(command).then(result => {
        let rootModel: RootModel;

        const events: EsEvent[] = result.records.map((record) => {
          const event: EsEvent = RmCommonController.deserializeEvent(record.get(0).properties, rootModel);
          rootModel = event.rootModel;

          return event;
        });

        resolve(events);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  static serializeEvent(event: EsEvent): string {
    const cloneEvent = JSON.parse(JSON.stringify(event));
    delete cloneEvent.rootModel;
    return JSON.stringify(cloneEvent).replace(/\"([^(\")"]+)\":/g, "$1:");
  }


  static appendToEventChain(event: EsEvent, parentId): Promise<any> {
    const serializedEvent = this.serializeEvent(event);
    const command = `MATCH (parent:Event) where ID(parent) = ${parentId} 
      CREATE (parent)-[r:APPEND {parentId: ${parentId}}]->(e:Event ${serializedEvent}) RETURN e`;

    return this._session.run(command);
  }

  static createNewRootModelEvent(newRootModelAddedEvent: RootModelAddedEvent): Promise<any> {
    const serializedEvent = this.serializeEvent(newRootModelAddedEvent);
    const command = `CREATE (e:Event ${serializedEvent}) RETURN e`;
    return this._session.run(command);
  }

  static getNodeIdFromCmdOutput(cmdOutput: any): number {
    if (cmdOutput === null) {
      throw new Error('The input neo4j command output should not be empty!');
    }
    return parseInt(cmdOutput.records[0].get(0).identity.low, 10);
  }

}
