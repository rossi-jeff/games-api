const { loadFiles } = require("@graphql-tools/load-files");
import { ApolloServer } from "apollo-server";

import { resolvers } from "./resolvers";

const startServer = async () => {
  const typeDefs = await loadFiles("src/**/*.schema.graphql");
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => console.log(`server started at ${url} `));
};

startServer();
