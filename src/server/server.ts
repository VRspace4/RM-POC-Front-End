import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as appGlobal from '../app/app.globals';
import {EventRepository} from './event-repository';
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {Controller} from "./controller";
import {Transponder} from "../app/es-demo/models/transponder";
import {Originator} from "../app/es-demo/models/originator";
import {EsEvent} from "../app/es-demo/events/es-event";
import {TransponderModifiedEvent} from "../app/es-demo/events/transponder-modified-event";
import * as http from "http";


export function run(callback: DoneFn): http.Server {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  // app.post('/events', function (request, response) {
  //   Controller.insertEvents(request.body.events, request.body.parentId, (transponder) => {
  //     response.send(transponder);
  //   });
  // });
  //
  // app.post('/default', function (request, response) {
  //   const events: EsEvent[] = [
  //     new TransponderAddedEvent('transponder 2')
  //   ];
  // });

  // app.post('/postTest', function (request, response) {
  //   // response.send('hello');
  //   response.status(401).json({error: 'something is wrong'});
  // });
  //
  //
  app.get('/hello', function (request, response) {
    console.log('whoa!');
    response.send('Here XXXXX is! Closing');
  });

  const server: http.Server = app.listen(appGlobal.serverPort, function () {
    console.log('Server started at port, ' + appGlobal.serverPort);

    if (callback) {
      callback();
    }
  });

  server.on('close', function () {
    console.log('Server closed');
  });

  return server;
};

if (require.main === module) {
  run(null);
}
