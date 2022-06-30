import http from "http";
import { createServer } from "@graphql-yoga/node";
import resolvers from "./graphql/resolvers";

const yogaServer = createServer({
  schema: {
    typeDefs: `
      type Person {
        id: Int!
        name: String!
        age: Int
        gender: String
      }
      type Movie {
        id: Int!
        title: String!
        score: Float
      }
      type Item {
        id: String!
        title: String!
        description: String
        date: String
        thumbnail: String
      }

      type Query {
        people: [Person]!
        person(id: Int!): Person
        movies: [Movie]!
        movie(id: Int!): Movie
        items(max: Int): [Item]!
        item(id: String!): Item
      }
      type Mutation {
        addMovie(title: String!, score: Float): Movie!
        deleteMovie(id: Int!): Boolean
      }
    `,
    resolvers,
  },
});

// yogaServer.start();
const httpServer = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  yogaServer.requestListener(req, res);
});
httpServer.listen(4000);
