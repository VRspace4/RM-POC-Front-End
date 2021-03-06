"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
//
var modules = [
    require('./modules/query'),
    require('./modules/mutation'),
    require('./modules/response-message.type'),
    require('./modules/customer.type'),
    require('./modules/originator.type'),
    require('./modules/allocation.type'),
    require('./modules/transponder.type'),
    require('./modules/root-model.type')
];
var mainDefs = ["\n  schema {\n    query: Query,\n    mutation: Mutation\n   }\n"];
var resolvers = modules.reduce(function (state, m) {
    if (!m.resolver) {
        return state;
    }
    return __assign({}, state, m.resolver);
}, {});
var typeDefs = mainDefs.concat(modules.map(function (m) { return m.typeDef; }).filter(function (res) { return !!res; }));
var Schema = graphql_tools_1.makeExecutableSchema({
    logger: console,
    resolverValidationOptions: {
        requireResolversForNonScalar: false
    },
    resolvers: resolvers,
    typeDefs: typeDefs
});
exports.Schema = Schema;
graphql_tools_1.addMockFunctionsToSchema({
    mocks: {},
    preserveResolvers: true,
    schema: Schema
});
//# sourceMappingURL=index.js.map