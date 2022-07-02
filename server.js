import { ApolloServer, gql } from "apollo-server";
import axios from "axios";
import "dotenv/config";

const API_KEY = process.env.API_KEY;

const tweets = [
  { id: "0", text: "hello", userId: "aa" },
  { id: "1", text: "world", userId: "ab" },
];
const users = [
  { id: "aa", username: "nico" },
  { id: "ab", username: "hello" },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    """
    id + username
    """
    fullname: String!
  }

  """
  Tweet object represents a tweet
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    allUsers: [User!]!
    allMovies: Movies!
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    """
    Delete a tweet
    """
    deleteTweet(id: ID!): Boolean!
  }

  type Movies {
    kind: String!
    etag: String!
    nextPageToken: String!
    items: [Item]!
    pageInfo: PageInfo!
  }
  type PageInfo {
    totalResults: Int!
    resultsPerPage: Int!
  }
  type Item {
    kind: String!
    etag: String!
    id: String!
    snippet: Snippet!
    contentDetails: ContentDetails!
  }
  type Snippet {
    publishedAt: String!
    channelId: String!
    title: String!
    description: String!
    thumbnails: Thumbnails!
    channelTitle: String!
    playlistId: String!
    position: Int!
    resourceId: ResourceId!
    videoOwnerChannelTitle: String!
    videoOwnerChannelId: String!
  }
  type Thumbnails {
    default: Thumbnail!
    medium: Thumbnail
    high: Thumbnail
    standard: Thumbnail
    maxres: Thumbnail
  }
  type Thumbnail {
    url: String!
    width: Int!
    height: Int!
  }
  type ResourceId {
    kind: String!
    videoId: String!
  }
  type ContentDetails {
    videoId: String!
    videoPublishedAt: String!
  }
`;

const resolvers = {
  Query: {
    allTweets: () => tweets,
    tweet: (root, { id }) => tweets.find((tweet) => tweet.id === id),
    allUsers: () => users,
    allMovies: () =>
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUyWiQldYO_-yeLJC0j5oq2g&key=${API_KEY}&part=snippet,contentDetails&maxResults=20`,
          { responseType: "json" }
        )
        .then((r) => r.data),
  },
  Mutation: {
    postTweet: (_, { text, userId }) => {
      const newTweet = { text, id: String(tweets.length), userId };
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
  Tweet: {
    author: ({ userId }) => users.find((user) => user.id === userId),
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
