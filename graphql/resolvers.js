import { people } from "./db";

const resolvers = {
  Query: {
    people: () => people,
    person: (id) => people.find((person) => person.id == id),
  },
};

export default resolvers;
