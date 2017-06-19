"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_globals_1 = require("../../../../app/app.globals");
var node_fetch_1 = require("node-fetch");
// import rp = require('request-promise');
// import * as rp from 'request-promise';
exports.typeDef = "\n  # Possible queries that can be executed\n  type Query {\n    # test String\n    testString: String\n    # Test the /hello endpoint\n    testQuery: String\n    rootModel: RootModel\n    customers: [Customer]\n    originators: [Originator]\n    transponders: [Transponder]\n    allocations(transponderId: String!): [Allocation]\n  }\n";
//
exports.resolver = {
    Query: {
        testString: function () {
            return 'test';
        },
        testQuery: function () {
            return node_fetch_1.default(app_globals_1.GeneralGlobals.commandRestUri + "/helloworld").then(function (res) {
                return res.text();
            }).then(function (body) {
                return (body);
            });
        },
        customers: function () {
            return node_fetch_1.default(app_globals_1.GeneralGlobals.commandRestUri + "/customers").then(function (res) {
                return res.json();
            }).then(function (body) {
                return (body);
            });
        },
        originators: function () {
            return node_fetch_1.default(app_globals_1.GeneralGlobals.commandRestUri + "/originators").then(function (res) {
                return res.json();
            }).then(function (body) {
                return (body);
            });
        },
        transponders: function () {
            return node_fetch_1.default(app_globals_1.GeneralGlobals.commandRestUri + "/transponders").then(function (res) {
                return res.json();
            }).then(function (body) {
                return (body);
            });
        },
        allocations: function (root, args, ctx) {
            console.log('************', args.transponderId);
            return node_fetch_1.default(app_globals_1.GeneralGlobals.commandRestUri + "/allocations/" + args.transponderId).then(function (res) {
                return res.json();
            }).then(function (body) {
                return (body);
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