"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var appGlobal = require("../app/app.globals");
var event_repository_1 = require("./event-repository");
var transponder_added_event_1 = require("../app/es-demo/events/transponder-added-event");
var controller_1 = require("./controller");
var customer_added_event_1 = require("../app/es-demo/events/customer-added-event");
var allocation_added_event_1 = require("../app/es-demo/events/allocation-added-event");
var root_model_added_event_1 = require("../app/es-demo/events/root-model-added-event");
var root_model_modified_event_1 = require("../app/es-demo/events/root-model-modified-event");
var originator_added_event_1 = require("../app/es-demo/events/originator-added-event");
function run(callback, debugFlag) {
    var app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.post('/events', function (request, response) {
        controller_1.Controller.insertEvents(request.body.events, request.body.parentId, function (transponder) {
            response.send(request.body);
        });
    });
    app.get('/test/getChainOfEvents', function (request, response) {
        event_repository_1.EventRepository.getChainOfEvents(140).then(function (events) {
            response.send(events);
        });
    });
    app.get('/test/defaultTransponder', function (request, response) {
        var events = [
            new root_model_added_event_1.RootModelAddedEvent(this._rootModel, 'Root Model 1'),
            new root_model_modified_event_1.RootModelModifiedEvent(this._rootModel, ['name'], ['Root Model name changed!']),
            new transponder_added_event_1.TransponderAddedEvent(this._rootModel, 'Transponder 1'),
            new customer_added_event_1.CustomerAddedEvent(this._rootModel, 'Intelsat'),
            new originator_added_event_1.OriginatorAddedEvent(this._rootModel, 'James Pham'),
            new allocation_added_event_1.AllocationAddedEvent(this._rootModel, this._rootModel.transponders[0].id, 0, 10, 15, this._rootModel.customers[0].id, this._rootModel.originators[0].id, 'Allocation 1')
        ];
        controller_1.Controller.insertEvents(events, null, function (transponder) {
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
    var server = app.listen(appGlobal.serverPort, function () {
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
}
exports.run = run;
;
if (require.main === module) {
    run(null, true);
}
//# sourceMappingURL=server.js.map