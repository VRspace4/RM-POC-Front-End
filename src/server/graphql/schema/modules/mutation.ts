import {addCustomer, sendHello} from "../../services/rm-command-mutation.service";

export const typeDef = `
  # The following commands mutate data within the model.
  type Mutation {
    # Send name and expect a hello back for testing purposes.
    sendHello(name: String!): String
    # Resets the current root model and start clean slate.
    resetRootModel(name: String!): ResponseMessage
    # Adds a new customer to the model.
    addCustomer(name: String!): ResponseMessage
    removeCustomer(id: String!): ResponseMessage
    addTransponder(name: String!, powerLimit: Float!, bandwidth: Float!): ResponseMessage
    removeTransponder(id: String!): ResponseMessage
    addOriginator(name: String!): ResponseMessage
    removeOriginator(id: String!): ResponseMessage
    addAllocation(allocationName: String!, startFrequency: Int!, stopFrequency: Int!,
                  powerUsage: Float!, transponderId: String!, customerId: String!,
                  originatorId: String!): ResponseMessage
    removeAllocation(transponderId: String!, allocationId: String!): ResponseMessage
    # Test response message type.
    testResponseMessage: ResponseMessage
  }
`;

export const resolver = {
  Mutation: {
    sendHello(root, args, ctx) {
      return ctx.sendHello(args.name);
    },
    resetRootModel(root, args, ctx) {
      return ctx.resetRootModel(args.name);
    },
    addAllocation(root, args, ctx) {
      return ctx.addAllocation(args.allocationName, args.startFrequency, args.stopFrequency,
                            args.powerUsage, args.transponderId, args.customerId, args.originatorId);
    },
    removeAllocation(root, args, ctx) {
      return ctx.removeAllocation(args.transponderId, args.allocationId);
    },
    addCustomer(root, args, ctx) {
      return ctx.addCustomer(args.name);
    },
    removeCustomer(root, args, ctx) {
      return ctx.removeCustomer(args.id);
    },
    addTransponder(root, args, ctx) {
      return ctx.addTransponder(args.name, args.powerLimit, args.bandwidth);
    },
    removeTransponder(root, args, ctx) {
      return ctx.removeTransponder(args.id);
    },
    addOriginator(root, args, ctx) {
      return ctx.addOriginator(args.name);
    },
    removeOriginator(root, args, ctx) {
      return ctx.removeOriginator(args.id);
    },
    testResponseMessage(root, args, ctx) {
      // return {type: 'success', title: 'title', message: 'message'};
      return ctx.addCustomer('Test Customer 1');
    }
  }
};
