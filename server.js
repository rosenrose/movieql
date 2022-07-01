import { ApolloServer, gql } from "apollo-server";

const tweets = [
  { id: "0", text: "hello" },
  { id: "1", text: "world" },
];
const users = [
  { id: "aa", username: "nico" },
  { id: "ab", username: "hello" },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    fullname: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    allUsers: [User!]!
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets: () => tweets,
    tweet: (root, { id }) => tweets.find((tweet) => tweet.id === id),
    allUsers: () => users,
  },
  Mutation: {
    postTweet: (_, { text, userId }) => {
      const newTweet = { text, id: String(tweets.length) };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet: (_, { id }) => {
      const index = tweets.findIndex((tweet) => tweet.id === id);
      if (index < 0) {
        return false;
      }
      tweets.splice(index, 1);
      return true;
    },
  },
  User: {
    fullname: (root) => {
      // console.log(root);
      return root.id + root.username;
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
