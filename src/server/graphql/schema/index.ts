import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema,  addMockFunctionsToSchema} from 'graphql-tools';

const modules = [
  require('./modules/query')
];

const mainDefs = [`
  schema {
    query: Query
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
