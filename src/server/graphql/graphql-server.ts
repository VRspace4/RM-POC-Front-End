import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import {Schema} from './schema';

export const GRAPHQL_ROUTE = '/graphql';
export const GRAPHIQL_ROUTE = '/graphiql';

interface IMainOptions {
  enableCors: boolean;
  enableGraphiql: boolean;
  env: string;
  port: number;
  verbose?: boolean;
}

function verbosePrint(port, enableGraphiql) {
  console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
  if (enableGraphiql === true) {
    console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
  }
}

export class TestConnector {
  public get testString() {
    return 'it works from connector as well!';
  }
}

export function main(options: IMainOptions) {
  const app = express();
  if (options.enableCors === true) {
    app.use(GRAPHQL_ROUTE, cors());
  }

  const testConnector = new TestConnector();
  app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress({
    context: {

    },
    schema: Schema
  }));

  if (options.enableGraphiql) {
    app.use(GRAPHIQL_ROUTE, graphiqlExpress({endpointURL: GRAPHQL_ROUTE}));
  }

  return new Promise((resolve, reject) => {
    const server = app.listen(options.port, () => {
      if (options.verbose) {
        verbosePrint(options.port, options.enableGraphiql);
      }

      resolve(server);
    }).on('error', (err: Error) => {
      reject(err);
    });
  });
}

if (require.main === module) {
  const PORT: number = process.env.PORT || 4000;

  // Either to export GraphiQL (Debug Interface) or not.
  const NODE_ENV: string = process.env.NODE_ENV !== "production" ? "dev" : "production";

  const EXPORT_GRAPHIQL: boolean = NODE_ENV !== "production";

  // Enable cors (cross-origin HTTP request) or not.
  const ENABLE_CORS: boolean = NODE_ENV !== "production";

  main({
    enableCors: ENABLE_CORS,
    enableGraphiql: EXPORT_GRAPHIQL,
    env: NODE_ENV,
    port: PORT,
    verbose: true
  });


}

