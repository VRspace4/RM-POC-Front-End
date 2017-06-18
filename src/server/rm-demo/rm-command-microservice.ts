import {RmCommandController} from "./command/rm-command-controller.service";
import {RmCommandRestServer} from "./command/rm-command-rest.service";
import {GeneralGlobals, RmEventType} from "../../app/app.globals";
import {MainVariables} from "../../app/es-demo/types/main-variables";
import {RootModel} from "../../app/es-demo/models/root-model";


async function main() {
  try {
    const mainVariables = new MainVariables(new RootModel(''));
    // const messageProducer = new RmMessageProducer();
    RmCommandRestServer.startServer(mainVariables, GeneralGlobals.commandRestPort, true, null);
    // RmMessageConsumer.startServer();
    // RmMessageOffset.testOffset();


    await RmCommandController.start(mainVariables)
      .then((currentRootModel: RootModel) => {
        console.log(currentRootModel.transponders);
      })
      .catch((e) => {
        console.error(e);
      });
    // RmMessageProducer.createClient();
    // await RmMessageProducer.startProducerClient();
    // RmMessageProducer.commitEvents([new CustomerAddedEvent(null, 'Customer 1')]);
    // mainVariables.rootModel = await RmCommandController.initialize();
  } catch (e) {
    console.log(e);
  }
}

main();
