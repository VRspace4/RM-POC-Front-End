"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var RmQueryRestServer = (function () {
    function RmQueryRestServer() {
    }
    RmQueryRestServer.startServer = function (rootModel, serverPort, postServerStatusMessages, callback) {
        var app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.get('/rootModel', function (request, response) {
            response.send(rootModel);
        });
        app.get('/transponders', function (request, response) {
            response.send(rootModel.transponders);
        });
        app.get('/customers', function (request, response) {
            response.send(rootModel.customers);
        });
        app.get('/originators', function (request, response) {
            response.send(rootModel.originators);
        });
        app.get('/hello', function (request, response) {
            response.send("I'm inside the query uservice!");
        });
        var server = app.listen(serverPort, function () {
            if (postServerStatusMessages === true) {
                console.log('Server started at port, ' + serverPort);
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
    };
    return RmQueryRestServer;
}());
exports.RmQueryRestServer = RmQueryRestServer;
;
// if (require.main === module) {
//   run(appGlobal.serverPort, null, true);
// }
//# sourceMappingURL=rm-query-rest.service.js.map