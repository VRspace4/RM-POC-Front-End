
import {RmMessageConsumer} from "./query/rm-message-consumer.service";
import {BrokerMessage} from "../../app/es-demo/types/broker-message.type";
import {RmQueryController} from "./query/rm-query-controller.service";
import {RootModel} from "../../app/es-demo/models/root-model";
import * as Rx from 'rxjs/Rx';

async function main() {
  const rootModel = new RootModel('');

  RmMessageConsumer.startConsumingEvents(rootModel, 0, function(message: BrokerMessage) {
      const processResult = RmMessageConsumer.processRawEventToRootModel(message.value, rootModel);
      if (rootModel.name !== '' && !processResult.passed) {
        throw new Error(processResult.failedMessage);
      } else if (rootModel.name !== '') {
        console.log('\n\n---====== Change detected ======--- \n', rootModel);
      }
  }.bind(this));



}

main();
