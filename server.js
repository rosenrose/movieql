import { ApolloServer, gql } from "apollo-server";

const server = new ApolloServer({});

server.listen().then((args) => {
  console.log(args);
});
