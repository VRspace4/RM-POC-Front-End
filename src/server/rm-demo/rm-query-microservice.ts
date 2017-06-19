
import {RmMessageConsumer} from "./query/rm-message-consumer.service";
import {BrokerMessage} from "../../app/es-demo/types/broker-message.type";
import {RootModel} from "../../app/es-demo/models/root-model";
import {RmQueryRestServer} from "./query/rm-query-rest.service";
import {GeneralGlobals} from "../../app/app.globals";

async function main() {
  const rootModel = new RootModel('');

  RmMessageConsumer.startConsumingEvents(rootModel, 0, function(message: BrokerMessage) {
      const processResult = RmMessageConsumer.processRawEventToRootModel(message.value, rootModel);
      if (rootModel.name !== '' && !processResult.verificationResult.passed) {
        throw new Error(processResult.verificationResult.failedMessage);
      } else if (rootModel.name !== '') {
        console.log('\n\n---====== Change detected ======--- \n', rootModel);
      }
  }.bind(this));

  RmQueryRestServer.startServer(rootModel, GeneralGlobals.queryRestPort, true, null);

}

main();
