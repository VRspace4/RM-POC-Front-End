"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var appGlobal = require("../../../app/app.globals");
var transponder_added_event_1 = require("../../../app/es-demo/events/transponder-added-event");
var customer_added_event_1 = require("../../../app/es-demo/events/customer-added-event");
var root_model_added_event_1 = require("../../../app/es-demo/events/root-model-added-event");
var root_model_modified_event_1 = require("../../../app/es-demo/events/root-model-modified-event");
var originator_added_event_1 = require("../../../app/es-demo/events/originator-added-event");
var rm_command_repository_service_1 = require("../../rm-demo/command/rm-command-repository.service");
var rm_command_controller_service_1 = require("../../rm-demo/command/rm-command-controller.service");
var rm_message_producer_service_1 = require("./rm-message-producer.service");
var RmCommandRestServer = (function () {
    function RmCommandRestServer() {
    }
    RmCommandRestServer.startServer = function (mainVariables, serverPort, postServerStatusMessages, callback) {
        var app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.post('/events', function (request, response, next) {
            console.log(mainVariables.rootModel);
            // Verify formatting
            var events = request.body.events;
            var verifyFormattingResult = rm_command_controller_service_1.RmCommandController.verifyEventsToBeCommitted(mainVariables, events);
            if (verifyFormattingResult.verificationResult.passed === false) {
                response.send(verifyFormattingResult.output);
                return next();
            }
            // Events verified, commit them
            rm_message_producer_service_1.RmMessageProducer.commitEvents(events)
                .then(function (result) {
                response.send(result.responseMessage);
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
            rm_command_repository_service_1.RmCommandRepository.getDataNode('RM-Demo').then(function (keyValue) {
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
        app.get('/helloworld', function (request, response) {
            response.send('Hello, world!');
        });
        var server = app.listen(serverPort, function () {
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
    };
    return RmCommandRestServer;
}());
exports.RmCommandRestServer = RmCommandRestServer;
;
// if (require.main === module) {
//   run(appGlobal.serverPort, null, true);
// }
//# sourceMappingURL=rm-command-rest.service.js.map