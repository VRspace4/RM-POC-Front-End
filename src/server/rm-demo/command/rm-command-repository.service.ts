import {v1 as neo4j} from 'neo4j-driver';
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";
import {Neo4jGlobals} from "../../../app/app.globals";
import {RootModel} from "../../../app/es-demo/models/root-model";
import {RmCommandController} from "./rm-command-controller.service";
import {RmCommonController} from "../common/rm-common-controller.service";
import {RootModelAddedEvent} from "../../../app/es-demo/events/root-model-added-event";
import {KeyValue} from "../../../app/es-demo/types/key-value";

const uri = 'bolt://rm';

export class RmCommandRepository {
  static _session = neo4j.driver(uri, neo4j.auth.basic('neo4j', 'Resman1989#')).session();

  static getDataNode(dataNodeName: string): Promise<KeyValue<string>> {
    const command = `MATCH (dataNode:Data {name: '${dataNodeName}'}) RETURN dataNode`;
    return new Promise((resolve, reject) => {
      RmCommandRepository._session.run(command).then(result => {
        const keys: string[] = [];
        const values: string[] = [];
        if (result.records.length > 0) {
          const resultObj = result.records[0].get(0).properties;
          for (const key in resultObj) {
            if (resultObj.hasOwnProperty(key)) {
              keys.push(key);
              values.push(resultObj[key]);
            }
            ;
          }
          ;
        }

        const keyValue = new KeyValue<string>(keys, values);

        resolve(keyValue);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  static setDataNode(dataNodeName: string, key: string, value: string) {
    const command = `MERGE (n:Data {name: '${Neo4jGlobals.rmDemoDataName}'}) 
                      SET n.${key} = '${value}'
                      RETURN n`;
    return RmCommandRepository._session.run(command);
  }

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
          const deserializationResult = RmCommandController.deserializeEvent(result.records[0].get(0).start.properties,
            rootModel);

          const rootEvent = deserializationResult.output;

          if (rootEvent instanceof RootModelAddedEvent) {
            rootModel = rootEvent.rootModel;
            events.push(rootEvent);

            let fieldLength = 0;

            for (const record of result.records) {
              if (fieldLength < record.get(0).length) {
                fieldLength++;
                const deserializeResult = RmCommandController.deserializeEvent(record.get(0).end.properties, rootModel);
                const event: EsEvent = deserializeResult.output;
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

  static async ensureNodeExist(eventName: string): Promise<any> {
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
          const deserializResult = RmCommandController.deserializeEvent(record.get(0).properties, rootModel);
          const event: EsEvent = deserializResult.output;
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
