import * as deepstream from 'deepstream.io-client-js';
import {DsGlobals} from "../../../app/app.globals";
import {RootModel} from "../../../app/es-demo/models/root-model";
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";

export class RmDeepstreamClient {
  static dsInstance;
  static rootModelRecord: deepstreamIO.Record;

  public static startDeepstreamClient() {
    this.dsInstance = deepstream(DsGlobals.serverURI);
    this.dsInstance.login(null, () => {
      console.log('Connected to deepstream server at ' + DsGlobals.serverURI);
    });
  }

  public static setRootModelRecord(rootModel: RootModel) {
    this.dsInstance.record.setData(DsGlobals.rootModelRecordName, rootModel, (error) => {
      console.log(rootModel);
      console.error(error);
    });
  }

  public static setRmEventRecord(event: EsEvent) {
    this.dsInstance.record.setData(DsGlobals.eventRecordName, event, (error) => {
      console.error(error);
    });
  }
}
