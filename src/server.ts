import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import CaddyClientRepository from './repositories/index';
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
// 
// import { Auth } from './auth/auth.service';

async function main() {

    const app = express();
    const connection = await createConnection()
    const schema = await buildSchema({ resolvers: [CaddyClientRepository] });
    // const auth = new Auth();
    let clientId: string = null;
    // console.log("Server has started!")
    const server = new ApolloServer({
        schema,
        validationRules: [depthLimit(7)],
        // context: async ({ req }) => {
        //     debugger;
        //     // Note! This example uses the `req` object to access headers,
        //     // but the arguments received by `context` vary by integration.
        //     // This means they will vary for Express, Koa, Lambda, etc.!
        //     //
        //     // To find out the correct arguments for a specific integration,
        //     // see the `context` option in the API reference for `apollo-server`:
        //     // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

        //     // Get the user token from the headers.
        //     const token = req.headers.authorization || '';

        //     if (clientId == null)
        //         // try to retrieve a user with the token
        //         clientId = await auth.authenticateClient(token);

        //     // add the user to the context
        //     return { clientId };
        // },
    });
    app.use('*', cors());
    app.use(compression());
    server.applyMiddleware({ app, path: '/api' });
    const httpServer = createServer(app);
    httpServer.listen(
        { port: 3000 },
        (): void => console.log(`\n🚀 GraphQL is now running on http://localhost:3000/api`));
}

main();