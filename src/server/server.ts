import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as appGlobal from '../app/app.globals';
import {EventRepository} from './event-repository';
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {Controller} from "./controller";
import {Transponder} from "../app/es-demo/models/transponder";
import {Originator} from "../app/es-demo/models/originator";
import {EsEvent} from "../app/es-demo/events/es-event.abstract";
import {TransponderModifiedEvent} from "../app/es-demo/events/transponder-modified-event";
import * as http from "http";
import {CustomerAddedEvent} from "../app/es-demo/events/customer-added-event";
import {AllocationAddedEvent} from "../app/es-demo/events/allocation-added-event";
import {RootModelAddedEvent} from "../app/es-demo/events/root-model-added-event";
import {RootModelModifiedEvent} from "../app/es-demo/events/root-model-modified-event";
import {OriginatorAddedEvent} from "../app/es-demo/events/originator-added-event";


export function run(callback: () => void, debugFlag: boolean): http.Server {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.post('/events', function (request, response) {
    Controller.insertEvents(request.body.events, request.body.parentId, (transponder) => {
      response.send(request.body);
    });

  });

  app.get('/test/getChainOfEvents', function(request, response) {
    EventRepository.getChainOfEvents(140).then((events: any) => {
      response.send(events);
    });
  });

  app.get('/test/defaultTransponder', function(request, response) {
    const events: EsEvent[] = [
      new RootModelAddedEvent(this._rootModel, 'Root Model 1'),
      new RootModelModifiedEvent(this._rootModel,
        ['name'],
        ['Root Model name changed!']),
      new TransponderAddedEvent(this._rootModel, 'Transponder 1'),
      new CustomerAddedEvent(this._rootModel, 'Intelsat'),
      new OriginatorAddedEvent(this._rootModel, 'James Pham'),
      new AllocationAddedEvent(this._rootModel, this._rootModel.transponders[0].id,
        0, 10, 15, this._rootModel.customers[0].id, this._rootModel.originators[0].id,
        'Allocation 1')
    ];

    Controller.insertEvents(events, null, (transponder: Transponder) => {
      response.send(transponder);
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
