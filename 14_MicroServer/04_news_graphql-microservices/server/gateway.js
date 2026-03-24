// server/gateway.js
//
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import cors from "cors";
import cookieParser from "cookie-parser";
//

const app = express();

// ✅ Fix: Add middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS and Cookie Parsing
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

// Configure the Apollo Gateway for microservices
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "auth", url: "http://localhost:4001/graphql" },
      { name: "community", url: "http://localhost:4002/graphql" },
    ],
  }),
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        if (context.cookie) {
          request.http.headers.set("cookie", context.cookie);
        }
        if (context.authorization) {
          request.http.headers.set("authorization", context.authorization);
        }
      },
      async didReceiveResponse({ response, request, context }) {
        // Check if subgraph is attempting to set a cookie (including logout/clear cookie instructions)
        const setCookie = response.http.headers.get("set-cookie");
        if (setCookie) {
          // Use appendHeader to prevent overwriting other potentially existing cookies
          context.res.append("set-cookie", setCookie);
        }
        return response;
      },
    });
  },
});

// Initialize Apollo Server
const server = new ApolloServer({
  gateway,
  introspection: true,
});

async function startServer() {
  await server.start();

  // Apply Express middleware for Apollo Server
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return {
          cookie: req.headers.cookie,
          authorization: req.headers.authorization,
          res,
        };
      },
    }),
  );

  // Start Express server
  app.listen(4000, () => {
    console.log(`🚀 API Gateway ready at http://localhost:4000/graphql`);
  });
}

startServer();
