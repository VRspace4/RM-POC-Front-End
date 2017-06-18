import {GeneralGlobals} from '../../../../app/app.globals';
import fetch from 'node-fetch';

export const typeDef = `
  # Possible queries that can be executed
  type Query {
    # test String
    testString: String
    # Test the /hello endpoint
    helloWorld: String
    rootModel: RootModelType
  }
`;

export const resolver = {
  Query: {
    testString() {
      return 'test';
    },
    helloWorld() {
        fetch(`${GeneralGlobals.serverHostname}:${GeneralGlobals.commandRestPort}/helloworld`)
          .then(function (response) {
            return response.text();
          });
    }
  }
};

    // const promise = new Promise(function(resolve, reject) {
    //   const newTransponderAddedEvent = new TransponderAddedEvent('Transponder 5');
    //   const cmdOutput: any = EventRepository.createNewTransponderEvent(newTransponderAddedEvent);
    //   resolve(cmdOutput);
    // }).then((cmdOutput: any) => {
    //   console.log(EventRepository.getNodeIdFromCmdOutput(cmdOutput));
    //   done();
    // });
