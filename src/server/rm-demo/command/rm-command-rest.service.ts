import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as appGlobal from '../../../app/app.globals';
import {TransponderAddedEvent} from "../../../app/es-demo/events/transponder-added-event";
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";
import * as http from "http";
import {CustomerAddedEvent} from "../../../app/es-demo/events/customer-added-event";
import {RootModelAddedEvent} from "../../../app/es-demo/events/root-model-added-event";
import {RootModelModifiedEvent} from "../../../app/es-demo/events/root-model-modified-event";
import {OriginatorAddedEvent} from "../../../app/es-demo/events/originator-added-event";
import {RootModel} from "../../../app/es-demo/models/root-model";
import {KeyValue} from "../../../app/es-demo/types/key-value";
import {RmCommonController} from "../../rm-demo/common/rm-common-controller.service";
import {RmCommandRepository} from "../../rm-demo/command/rm-command-repository.service";
import {RmCommandController} from "../../rm-demo/command/rm-command-controller.service";
import {RmCommonRepository} from "../../rm-demo/common/rm-common-repository.service";
import {forEach} from "@angular/router/src/utils/collection";
import {VerificationOutput} from "../../../app/es-demo/types/verification-output";
import {ResponseMessage, ResponseMessageType} from "../../../app/es-demo/types/response-message";


export class RmCommandRestServer {
  static startServer(serverPort: number, postServerStatusMessages: boolean, callback: () => void): http.Server {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.post('/events', function (request, response, next) {
      // Verify formatting
      const events = request.body.events;
      const verifyFormattingResult = RmCommandController.verifyEventsFormatting(events);
      if (verifyFormattingResult.verificationResult.passed === false) {
        response.send(verifyFormattingResult);
        return next();
      }

      // Verify event processing()

    });

    app.get('/rootModel/productionRootModelId', function(request, response) {
      RmCommandRepository.getProductionRootModelId().then((rootModelId: string) => {
        response.send(rootModelId);
      }).catch((e) => {
        response.status(400).send(e.message);
      });
    });

    app.get('/rootModel/productionEventChain', function(request, response) {
      RmCommandRepository.getProductionEventChain().then((events: EsEvent[]) => {
        response.send(events);
      }).catch((e) => {
        response.status(400).send(e.message);
      });
    });

    app.get('/dataNode/rmDemo', function(request, response) {
      RmCommandRepository.getDataNode('RM-Demo').then((keyValue: KeyValue<string>) => {
        response.send(keyValue);
      }).catch((e) => {
        response.status(400).send(e.message);
      });
    });

    app.get('/test/getChainOfEvents', function(request, response) {
      RmCommandRepository.getChainOfEvents(140).then((events: any) => {
        response.send(events);
      }).catch((e: Error) => {
        response.status(400).send(e.message);
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

      RmCommandController.insertEvents(events, null, function(rootModel: RootModel) {
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

    const server: http.Server = app.listen(serverPort, function () {
      if (postServerStatusMessages === true) {
        console.log('Server started at port, ' + appGlobal.serverPort);
      }

      if (callback) {
        callback();
      }
    });

    server.on('close', function () {
      if (postServerStatusMessages === true) {
        console.log('Server closed');
      }
    });

    return server;
  }
}

;

// if (require.main === module) {
//   run(appGlobal.serverPort, null, true);
// }
