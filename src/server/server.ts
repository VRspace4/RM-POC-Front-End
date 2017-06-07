import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {EventRepository} from './event-repository';
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {Controller} from "./controller";
import {Transponder} from "../app/es-demo/models/transponder";
import {Originator} from "../app/es-demo/models/originator";
import {EsEvent} from "../app/es-demo/events/es-event";
import {TransponderModifiedEvent} from "../app/es-demo/events/transponder-modified-event";

// EventRepository.createNewTransponderEvent(new TransponderAddedEvent('123id', 'name1'));
// const newTransponder = new TransponderAddedEvent('id123', 'name23');

// Controller.testFunc(new TransponderAddedEvent(
  // new Transponder('transponderName123')));

// Controller.
// const newTransponder: Transponder = new Transponder('Transponder 1');
// console.log(JSON.stringify(newTransponder));
// for (const keyName in newTransponder) {
//   if (newTransponder.hasOwnProperty(keyName)) {
//     console.log(keyName);
//   }
// }

// const newTransponder: Transponder = new Transponder("Transponder 1");
// const event1: EsEvent = new TransponderAddedEvent(newTransponder);
// const event2: EsEvent = new TransponderModifiedEvent(newTransponder,
//   ['bandwidth', 'powerLimit'], ['150', '200']);
// const events: EsEvent[] = [event1, event2];
// console.log(JSON.stringify(events));
//


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/events', function(request, response) {
  Controller.insertEvents(request.body.events, request.body.parentId, (transponder) => {
    response.send(transponder);
  });
});

app.post('/default', function(request, response){
  const events: EsEvent[] = [
      new TransponderAddedEvent('transponder 2')
    ];
});

app.post('/postTest', function(request, response) {
  // response.send('hello');
  response.status(401).json({ error: 'something is wrong' });
});


app.get('/hello', function(request, response) {
  console.log('whoa!');
  response.send('Here it is!');
});

app.listen(80);
