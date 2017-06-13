import * as appGlobal from '../../../../app/app.globals';
import fetch from 'node-fetch';

export const typeDef = `
  # Possible queries that can be executed
  type Query {
    # test String
    testString: String
    # Test the /hello endpoint
    testHello: String
    rootModel: RootModelType
  }
`;

export const resolver = {
  Query: {
    testString() {
      return `${appGlobal.url}:${appGlobal.serverPort}/hello`;
    },
    testHello() {
        fetch(`${appGlobal.url}:${appGlobal.serverPort}/hello`).then(function (response) {
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
