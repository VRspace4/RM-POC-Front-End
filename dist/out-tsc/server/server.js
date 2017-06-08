"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var appGlobal = require("../app/app.globals");
function run(callback) {
    var app = express();
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
    var server = app.listen(appGlobal.serverPort, function () {
        console.log('Server started at port, ' + appGlobal.serverPort);
        if (callback) {
            callback();
        }
    });
    server.on('close', function () {
        console.log('Server closed');
    });
    return server;
}
exports.run = run;
;
if (require.main === module) {
    run(null);
}
//# sourceMappingURL=server.js.map