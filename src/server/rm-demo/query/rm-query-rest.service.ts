import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as appGlobal from '../../../app/app.globals';
import * as http from "http";
import {RootModel} from "../../../app/es-demo/models/root-model";


export class RmQueryRestServer {
  static startServer(rootModel: RootModel, serverPort: number, postServerStatusMessages: boolean, callback: () => void): http.Server {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.get('/rootModel', function(request, response) {
      response.send(rootModel);
    });

    app.get('/transponders', function(request, response) {
      response.send(rootModel.transponders);
    });

    app.get('/customers', function(request, response) {
      response.send(rootModel.customers);
    });

    app.get('/originators', function(request, response) {
      response.send(rootModel.originators);
    });

    app.get('/hello', function (request, response) {
      response.send("I'm inside the query uservice!");
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
