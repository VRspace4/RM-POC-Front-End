import {GeneralGlobals} from '../../../../app/app.globals';
import fetch from 'node-fetch';
// import rp = require('request-promise');
// import * as rp from 'request-promise';

export const typeDef = `
  # Possible queries that can be executed
  type Query {
    # test String
    testString: String
    # Test the /hello endpoint
    testQuery: String
    rootModel: RootModel
    customers: [Customer]
    originators: [Originator]
    transponders: [Transponder]
    allocations(transponderId: String!): [Allocation]
  }
`;

//
export const resolver = {
  Query: {
    testString() {
      return 'test';
    },
    testQuery() {
      return fetch(`${GeneralGlobals.commandRestUri}/helloworld`).then((res) => {
        return res.text();
      }).then((body) => {
        return (body);
      });
    },
    customers() {
      return fetch(`${GeneralGlobals.commandRestUri}/customers`).then((res) => {
        return res.json();
      }).then((body) => {
        return (body);
      });
    },
    originators() {
      return fetch(`${GeneralGlobals.commandRestUri}/originators`).then((res) => {
        return res.json();
      }).then((body) => {
        return (body);
      });
    },
    transponders() {
      return fetch(`${GeneralGlobals.commandRestUri}/transponders`).then((res) => {
        return res.json();
      }).then((body) => {
        return (body);
      });
    },
    allocations(root, args, ctx) {
      console.log('************', args.transponderId);
      return fetch(`${GeneralGlobals.commandRestUri}/allocations/${args.transponderId}`).then((res) => {
        return res.json();
      }).then((body) => {
        return (body);
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
