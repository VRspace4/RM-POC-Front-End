"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var transponder_added_event_1 = require("../app/es-demo/events/transponder-added-event");
var controller_1 = require("./controller");
// EventRepository.createNewTransponderEvent(new TransponderAddedEvent('123id', 'name1'));
// const newTransponder = new TransponderAddedEvent('id123', 'name23');
// Controller.testFunc(new TransponderAddedEvent(
// new Transponder('transponderName123')));
// Controller.
// const newTransponder: Transponder = new Transponder('Transponder 1');
// console.log(JSON.stringify(newTransponder));
// for (const keyName in newTransponder) {
//   if (newTransponder.hasOwnProperty(keyName)) {
//     console.log(keyName);
//   }
// }
// const newTransponder: Transponder = new Transponder("Transponder 1");
// const event1: EsEvent = new TransponderAddedEvent(newTransponder);
// const event2: EsEvent = new TransponderModifiedEvent(newTransponder,
//   ['bandwidth', 'powerLimit'], ['150', '200']);
// const events: EsEvent[] = [event1, event2];
// console.log(JSON.stringify(events));
//
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.post('/events', function (request, response) {
    controller_1.Controller.insertEvents(request.body.events, request.body.parentId, function (transponder) {
        response.send(transponder);
    });
});
app.post('/default', function (request, response) {
    var events = [
        new transponder_added_event_1.TransponderAddedEvent('transponder 2')
    ];
});
app.post('/postTest', function (request, response) {
    // response.send('hello');
    response.status(401).json({ error: 'something is wrong' });
});
app.get('/hello', function (request, response) {
    console.log('whoa!');
    response.send('Here it is!');
});
app.listen(80);
//# sourceMappingURL=server.js.map