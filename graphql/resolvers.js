import { people } from "./db";

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => people.find((person) => person.id == id),
  },
};

export default resolvers;
