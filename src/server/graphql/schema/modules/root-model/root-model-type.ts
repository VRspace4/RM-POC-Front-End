import {url, serverPort} from '../../../../../app/app.globals';
import fetch from 'node-fetch';

export const typeDef = `
type RootModelType {
  name: String
  id: String
  eventId: Int
}
`;

// function testHello(): string {
//   fetch(`${url}:${serverPort}/hello`).then(function (response) {
//     return response.text();
//   });
// }
//
// const outputString: string = testHello();

export const resolver = {
  RootModelType: {
    name() {
      fetch(`${url}:${serverPort}/hello`).then(function (response) {
        return response.text();
      });
    },
    id() {
      return 'id123';
    },
    eventId() {
      return 123;
    }
  }
};
