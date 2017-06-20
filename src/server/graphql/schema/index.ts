import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema,  addMockFunctionsToSchema} from 'graphql-tools';
//
const modules = [
  require('./modules/query'),
  require('./modules/mutation'),
  require('./modules/response-message.type'),
  require('./modules/customer.type'),
  require('./modules/originator.type'),
  require('./modules/allocation.type'),
  require('./modules/transponder.type'),
  require('./modules/root-model.type')
];

const mainDefs = [`
  schema {
    query: Query,
    mutation: Mutation
   }
`];

const resolvers = modules.reduce((state, m) => {
  if (!m.resolver) {
    return state;
  }

  return {
    ...state,
    ...m.resolver
  };
}, {});

const typeDefs = mainDefs.concat(modules.map((m) => m.typeDef).filter((res) => !!res));

const Schema: GraphQLSchema = makeExecutableSchema({
  logger: console,
  resolverValidationOptions: {
    requireResolversForNonScalar: false
  },
  resolvers: resolvers,
  typeDefs: typeDefs
});

addMockFunctionsToSchema({
  mocks: {},
  preserveResolvers: true,
  schema: Schema
});

export {Schema};
