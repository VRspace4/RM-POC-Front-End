"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var graphql_server_express_1 = require("graphql-server-express");
var schema_1 = require("./schema");
var rm_command_mutation_service_1 = require("./services/rm-command-mutation.service");
exports.GRAPHQL_ROUTE = '/graphql';
exports.GRAPHIQL_ROUTE = '/graphiql';
function verbosePrint(port, enableGraphiql) {
    console.log("GraphQL Server is now running on http://localhost:" + port + exports.GRAPHQL_ROUTE);
    if (enableGraphiql === true) {
        console.log("GraphiQL Server is now running on http://localhost:" + port + exports.GRAPHIQL_ROUTE);
    }
}
var TestConnector = (function () {
    function TestConnector() {
    }
    Object.defineProperty(TestConnector.prototype, "testString", {
        get: function () {
            return 'it works from connector as well!';
        },
        enumerable: true,
        configurable: true
    });
    return TestConnector;
}());
exports.TestConnector = TestConnector;
function main(options) {
    var app = express();
    if (options.enableCors === true) {
        app.use(exports.GRAPHQL_ROUTE, cors());
    }
    var testConnector = new TestConnector();
    app.use(exports.GRAPHQL_ROUTE, bodyParser.json(), graphql_server_express_1.graphqlExpress({
        context: {
            sendHello: rm_command_mutation_service_1.sendHello,
            addCustomer: rm_command_mutation_service_1.addCustomer,
            removeCustomer: rm_command_mutation_service_1.removeCustomer,
            addTransponder: rm_command_mutation_service_1.addTransponder,
            removeTransponder: rm_command_mutation_service_1.removeTransponder,
            addOriginator: rm_command_mutation_service_1.addOriginator,
            removeOriginator: rm_command_mutation_service_1.removeOriginator,
            resetRootModel: rm_command_mutation_service_1.resetRootModel,
            addAllocation: rm_command_mutation_service_1.addAllocation,
            removeAllocation: rm_command_mutation_service_1.removeAllocation
        },
        schema: schema_1.Schema
    }));
    if (options.enableGraphiql) {
        app.use(exports.GRAPHIQL_ROUTE, graphql_server_express_1.graphiqlExpress({ endpointURL: exports.GRAPHQL_ROUTE }));
    }
    return new Promise(function (resolve, reject) {
        var server = app.listen(options.port, function () {
            if (options.verbose) {
                verbosePrint(options.port, options.enableGraphiql);
            }
            resolve(server);
        }).on('error', function (err) {
            reject(err);
        });
    });
}
exports.main = main;
if (require.main === module) {
    var PORT = process.env.PORT || 4000;
    // Either to export GraphiQL (Debug Interface) or not.
    var NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";
    var EXPORT_GRAPHIQL = NODE_ENV !== "production";
    // Enable cors (cross-origin HTTP request) or not.
    var ENABLE_CORS = NODE_ENV !== "production";
    main({
        enableCors: ENABLE_CORS,
        enableGraphiql: EXPORT_GRAPHIQL,
        env: NODE_ENV,
        port: PORT,
        verbose: true
    });
}
//# sourceMappingURL=graphql-server.js.map