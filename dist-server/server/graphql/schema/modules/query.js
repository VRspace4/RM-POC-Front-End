"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appGlobal = require("../../../../app/app.globals");
var node_fetch_1 = require("node-fetch");
exports.typeDef = "\n  # Possible queries that can be executed\n  type Query {\n    # test String\n    testString: String\n    # Test the /hello endpoint\n    testHello: String\n    rootModel: RootModelType\n  }\n";
exports.resolver = {
    Query: {
        testString: function () {
            return appGlobal.url + ":" + appGlobal.serverPort + "/hello";
        },
        testHello: function () {
            node_fetch_1.default(appGlobal.url + ":" + appGlobal.serverPort + "/hello").then(function (response) {
                return response.text();
            });
        }
    }
};
// const promise = new Promise(function(resolve, reject) {
//   const newTransponderAddedEvent = new TransponderAddedEvent('Transponder 5');
//   const cmdOutput: any = EventRepository.createNewTransponderEvent(newTransponderAddedEvent);
//   resolve(cmdOutput);
// }).then((cmdOutput: any) => {
//   console.log(EventRepository.getNodeIdFromCmdOutput(cmdOutput));
//   done();
// });
//# sourceMappingURL=query.js.map