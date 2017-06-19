import {RmMessageConsumer} from "./query/rm-message-consumer.service";
import {BrokerMessage} from "../../app/es-demo/types/broker-message.type";
import {RootModel} from "../../app/es-demo/models/root-model";
import {RmDeepstreamClient} from "./realtime/rm-deepstream-client";

// const rootModelRecordName = 'rmdemo/rootModel';
// this.rootModelRecord = this.ds.dsInstance.record.getRecord(rootModelRecordName);
// this.rootModelRecord.whenReady((record) => {
//   console.log('rootModelRecord', record);
// });
// this.rootModelRecord.subscribe(this.rootModelChanged, true);
// }
//
// rootModelChanged(data) {
//   console.log('rootModel changed', data);
// }

async function main() {
  const rootModel = new RootModel('');

  await RmDeepstreamClient.startDeepstreamClient();

  RmMessageConsumer.startConsumingEvents(rootModel, 0, function(message: BrokerMessage) {
    const processResult = RmMessageConsumer.processRawEventToRootModel(message.value, rootModel);
    if (rootModel.name !== '' && !processResult.verificationResult.passed) {
      throw new Error(processResult.verificationResult.failedMessage);
    } else if (rootModel.name !== '') {
      // console.log('\n\n---====== Change detected ======--- \n', rootModel);
      RmDeepstreamClient.setRmEventRecord(processResult.output);
      RmDeepstreamClient.setRootModelRecord(rootModel);
    }
  }.bind(this));

  process.on('SIGINT', function () {
    console.log('Shutting down deepstream client...');
    RmDeepstreamClient.dsInstance.close();
    process.exit();
  });

  // For nodemon restarts..
  process.once('SIGUSR2', function () {
    RmDeepstreamClient.dsInstance.close();
    console.log('Restarting deepstream client...');
    process.kill(process.pid, 'SIGUSR2');
  });
}


main();
