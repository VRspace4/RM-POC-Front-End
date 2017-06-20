"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_client_1 = require("apollo-client");
var clientConfig = new apollo_client_1.ApolloClient({
    networkInterface: apollo_client_1.createNetworkInterface({
        uri: 'http://localhost'
    })
});
function client() {
    return clientConfig;
}
exports.client = client;
//# sourceMappingURL=client.js.map