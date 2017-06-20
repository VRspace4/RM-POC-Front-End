"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = "\n  # The following commands mutate data within the model.\n  type Mutation {\n    # Send name and expect a hello back for testing purposes.\n    sendHello(name: String!): String\n    # Resets the current root model and start clean slate.\n    resetRootModel(name: String!): ResponseMessage\n    # Adds a new customer to the model.\n    addCustomer(name: String!): ResponseMessage\n    removeCustomer(id: String!): ResponseMessage\n    addTransponder(name: String!, powerLimit: Float!, bandwidth: Float!): ResponseMessage\n    removeTransponder(id: String!): ResponseMessage\n    addOriginator(name: String!): ResponseMessage\n    removeOriginator(id: String!): ResponseMessage\n    addAllocation(allocationName: String!, startFrequency: Int!, stopFrequency: Int!,\n                  powerUsage: Float!, transponderId: String!, customerId: String!,\n                  originatorId: String!): ResponseMessage\n    removeAllocation(transponderId: String!, allocationId: String!): ResponseMessage\n    # Test response message type.\n    testResponseMessage: ResponseMessage\n  }\n";
exports.resolver = {
    Mutation: {
        sendHello: function (root, args, ctx) {
            return ctx.sendHello(args.name);
        },
        resetRootModel: function (root, args, ctx) {
            return ctx.resetRootModel(args.name);
        },
        addAllocation: function (root, args, ctx) {
            return ctx.addAllocation(args.allocationName, args.startFrequency, args.stopFrequency, args.powerUsage, args.transponderId, args.customerId, args.originatorId);
        },
        removeAllocation: function (root, args, ctx) {
            return ctx.removeAllocation(args.transponderId, args.allocationId);
        },
        addCustomer: function (root, args, ctx) {
            return ctx.addCustomer(args.name);
        },
        removeCustomer: function (root, args, ctx) {
            return ctx.removeCustomer(args.id);
        },
        addTransponder: function (root, args, ctx) {
            return ctx.addTransponder(args.name, args.powerLimit, args.bandwidth);
        },
        removeTransponder: function (root, args, ctx) {
            return ctx.removeTransponder(args.id);
        },
        addOriginator: function (root, args, ctx) {
            return ctx.addOriginator(args.name);
        },
        removeOriginator: function (root, args, ctx) {
            return ctx.removeOriginator(args.id);
        },
        testResponseMessage: function (root, args, ctx) {
            // return {type: 'success', title: 'title', message: 'message'};
            return ctx.addCustomer('Test Customer 1');
        }
    }
};
//# sourceMappingURL=mutation.js.map