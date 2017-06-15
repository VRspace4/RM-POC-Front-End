import {KeyValue} from "../../../app/es-demo/models/key-value"
import {Neo4jGlobals} from "../../../app/app.globals";
import {RmCommandRepository} from '../command/rm-command-repository.service';

//
export class RmCommonRepository {

  static getDataNode(dataNodeName: string): Promise<KeyValue<string>> {
    const command = `MATCH (dataNode:Data {name: '${dataNodeName}'}) RETURN dataNode`;
    return new Promise((resolve, reject) => {
      RmCommandRepository._session.run(command).then(result => {
        const keys: string[] = [];
        const values: string[] = [];
        const resultObj = result.records[0].get(0).properties;
        for (const key in resultObj) {
          if (resultObj.hasOwnProperty(key)) {
            keys.push(key);
            values.push(resultObj[key]);
          };
        };

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

}
