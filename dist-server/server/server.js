"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var appGlobal = require("../app/app.globals");
var transponder_added_event_1 = require("../app/es-demo/events/transponder-added-event");
var customer_added_event_1 = require("../app/es-demo/events/customer-added-event");
var root_model_added_event_1 = require("../app/es-demo/events/root-model-added-event");
var root_model_modified_event_1 = require("../app/es-demo/events/root-model-modified-event");
var originator_added_event_1 = require("../app/es-demo/events/originator-added-event");
var rm_common_controller_service_1 = require("./rm-demo/common/rm-common-controller.service");
var rm_command_repository_service_1 = require("./rm-demo/command/rm-command-repository.service");
var rm_command_controller_service_1 = require("./rm-demo/command/rm-command-controller.service");
var rm_common_repository_service_1 = require("./rm-demo/common/rm-common-repository.service");
rm_common_controller_service_1.RmCommonController.initializeMaterializedView();
function run(serverPort, callback, debugFlag) {
    var app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.post('/events', function (request, response) {
        rm_command_controller_service_1.RmCommandController.insertEvents(request.body.events, request.body.parentId, function (transponder) {
            response.send(request.body);
        });
    });
    app.get('/rootModel/productionRootModelId', function (request, response) {
        rm_command_repository_service_1.RmCommandRepository.getProductionRootModelId().then(function (rootModelId) {
            response.send(rootModelId);
        }).catch(function (e) {
            response.status(400).send(e.message);
        });
    });
    app.get('/rootModel/productionEventChain', function (request, response) {
        rm_command_repository_service_1.RmCommandRepository.getProductionEventChain().then(function (events) {
            response.send(events);
        }).catch(function (e) {
            response.status(400).send(e.message);
        });
    });
    app.get('/dataNode/rmDemo', function (request, response) {
        rm_common_repository_service_1.RmCommonRepository.getDataNode('RM-Demo').then(function (keyValue) {
            response.send(keyValue);
        }).catch(function (e) {
            response.status(400).send(e.message);
        });
    });
    app.get('/test/getChainOfEvents', function (request, response) {
        rm_command_repository_service_1.RmCommandRepository.getChainOfEvents(140).then(function (events) {
            response.send(events);
        }).catch(function (e) {
            response.status(400).send(e.message);
        });
    });
    app.get('/test/defaultRootModel', function (request, response) {
        var events = [
            new root_model_added_event_1.RootModelAddedEvent(null, 'Root Model 1'),
            new root_model_modified_event_1.RootModelModifiedEvent(null, ['name'], ['Root Model name changed!']),
            new transponder_added_event_1.TransponderAddedEvent(null, 'Transponder 1'),
            new customer_added_event_1.CustomerAddedEvent(null, 'Intelsat'),
            new originator_added_event_1.OriginatorAddedEvent(null, 'James Pham')
        ];
        rm_command_controller_service_1.RmCommandController.insertEvents(events, null, function (rootModel) {
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
    var server = app.listen(serverPort, function () {
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
    run(appGlobal.serverPort, null, true);
}
//# sourceMappingURL=server.js.map