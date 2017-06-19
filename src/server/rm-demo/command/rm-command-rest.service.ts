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
import {RmMessageProducer} from "./rm-message-producer.service";
import {ReturnWithResponseMsg} from "../../../app/es-demo/types/return-with-response-message.type";
import {MainVariables} from "../../../app/es-demo/types/main-variables";


export class RmCommandRestServer {
  static startServer(mainVariables: MainVariables, serverPort: number,
                     postServerStatusMessages: boolean, callback: () => void): http.Server {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.post('/events', function (request, response, next) {
      console.log(mainVariables.rootModel);
      // Verify formatting
      const events = request.body.events;
      const verifyFormattingResult = RmCommandController.verifyEventsToBeCommitted(mainVariables, events);
      if (verifyFormattingResult.verificationResult.passed === false) {
        response.send(verifyFormattingResult.output);
        return next();
      }

      // Events verified, commit them
      RmMessageProducer.commitEvents(events)
        .then((result: ReturnWithResponseMsg<number>) => {
          events.forEach((event: EsEvent) => {
            const convertedEvent = RmCommandController.deserializeEvent(event, mainVariables.rootModel);
            convertedEvent.output.process();
          });
          response.send(result.responseMessage);
        });
    });

    app.post('/helloworld', function (request, response, next) {
      console.log(`[REST] Received POST from /helloworld (${request.body}`);
      response.send(`Hello, ${request.body.name}!`);
    });

    app.get('/customers', function(request, response) {
      response.send(mainVariables.rootModel.customers);
    });

    app.get('/originators', function(request, response) {
      response.send(mainVariables.rootModel.originators);
    });

    app.get('/transponders', function(request, response) {
      response.send(mainVariables.rootModel.transponders);
    });

    app.get('/rootModel', function(request, response) {
      response.send(mainVariables.rootModel);
    });

    app.get('/allocations/:transponderId', function(request, response) {
      const allocation = mainVariables.rootModel.getTransponder(request.params.transponderId).allocations;
      response.send(allocation);
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
    app.get('/helloworld', function (request, response) {
      console.log(`[REST] Received GET from /helloworld (${request.body}`);
      response.send('Hello, worldxxx!');
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
