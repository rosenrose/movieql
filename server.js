import { ApolloServer, gql } from "apollo-server";

const tweets = [
  { id: "0", text: "hello" },
  { id: "1", text: "world" },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = { text, id: String(tweets.length) };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const index = tweets.findIndex((tweet) => tweet.id === id);
      if (index < 0) {
        return false;
      }
      tweets.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ res }) => {
    res.header("Access-Control-Allow-Origin", "*");
  },
});

server.listen().then((args) => {
  // console.log(args);
});
