import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as appGlobal from '../app/app.globals';
import {EventRepository} from './event-repository';
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {Controller} from "./controller";
import {EsEvent} from "../app/es-demo/events/es-event.abstract";
import * as http from "http";
import {CustomerAddedEvent} from "../app/es-demo/events/customer-added-event";
import {RootModelAddedEvent} from "../app/es-demo/events/root-model-added-event";
import {RootModelModifiedEvent} from "../app/es-demo/events/root-model-modified-event";
import {OriginatorAddedEvent} from "../app/es-demo/events/originator-added-event";
import {RootModel} from "../app/es-demo/models/root-model";


export function run(callback: () => void, debugFlag: boolean): http.Server {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.post('/events', function (request, response) {
    Controller.insertEvents(request.body.events, request.body.parentId, (transponder) => {
      response.send(request.body);
    });
  });
  //
  app.get('/test/getChainOfEvents', function(request, response) {
    EventRepository.getChainOfEvents(140).then((events: any) => {
      response.send(events);
    }).catch((e: Error) => {
      response.status(500).send(e.message);
    });
  });

  app.get('/test/defaultRootModel', function(request, response) {
    const events: EsEvent[] = [
      new RootModelAddedEvent(null, 'Root Model 1'),
      new RootModelModifiedEvent(null, ['name'], ['Root Model name changed!']),
      new TransponderAddedEvent(null, 'Transponder 1'),
      new CustomerAddedEvent(null, 'Intelsat'),
      new OriginatorAddedEvent(null, 'James Pham')
    ];

    Controller.insertEvents(events, null, function(rootModel: RootModel) {
      response.send(rootModel);
    });
  });
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
    response.send('It worked!');
  });

  const server: http.Server = app.listen(appGlobal.serverPort, function () {
    if (debugFlag === true) {
      console.log('Server started at port, ' + appGlobal.serverPort);
    }

    if (callback) {
      callback();
    }
  });

  server.on('close', function () {
    if (debugFlag === true) {
      console.log('Server closed');
    }
  });

  return server;
};

if (require.main === module) {
  run(null, true);
}
