"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_globals_1 = require("../../../../../app/app.globals");
var node_fetch_1 = require("node-fetch");
exports.typeDef = "\ntype RootModelType {\n  name: String\n  id: String\n  eventId: Int\n}\n";
// function testHello(): string {
//   fetch(`${url}:${serverPort}/hello`).then(function (response) {
//     return response.text();
//   });
// }
//
// const outputString: string = testHello();
exports.resolver = {
    RootModelType: {
        name: function () {
            node_fetch_1.default(app_globals_1.GeneralGlobals.serverHostname + ":" + app_globals_1.GeneralGlobals.serverPort + "/hello").then(function (response) {
                return response.text();
            });
        },
        id: function () {
            return 'id123';
        },
        eventId: function () {
            return 123;
        }
    }
};
//# sourceMappingURL=root-model-type.js.map