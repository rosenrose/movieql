import { createServer } from "@graphql-yoga/node";
import resolvers from "./graphql/resolvers";

const server = createServer({
  schema: {
    typeDefs: `
      type Person {
        id: Int!
        name: String!
        age: Int
        gender: String
      }

      type Query {
        people: [Person]!
        person(id: Int!): Person
      }
    `,
    resolvers,
  },
});

server.start();
