import {RmCommandController} from "./command/rm-command-controller.service";
import {RmCommandRestServer} from "./command/rm-command-rest.service";
import {GeneralGlobals, RmEventType} from "../../app/app.globals";
import {MainVariables} from "../../app/es-demo/types/main-variables";
import {RootModel} from "../../app/es-demo/models/root-model";
import {RmMessageConsumer} from "./common/rm-common-message-consumer.service";
import {RmMessageProducer} from "./command/rm-message-producer.service";
import {RmMessageOffset} from "./command/rm-message-offset.service";
import {EventAndMsgOffset} from "../../app/es-demo/types/event-and-msg-offset.type";
import {CustomerAddedEvent} from "../../app/es-demo/events/customer-added-event";


async function main() {
  const mainVariables = new MainVariables(null);
  // const messageProducer = new RmMessageProducer();
  RmCommandRestServer.startServer(GeneralGlobals.restServerPort, true, null);
  // RmMessageConsumer.startServer();
  // RmMessageOffset.testOffset();

  const rootModel = await RmCommandController.initialize();
  console.log(rootModel);
  // RmMessageProducer.createClient();
  // await RmMessageProducer.startProducerClient();
  // RmMessageProducer.commitEvents([new CustomerAddedEvent(null, 'Customer 1')]);
  // mainVariables.rootModel = await RmCommandController.initialize();
}

main();
