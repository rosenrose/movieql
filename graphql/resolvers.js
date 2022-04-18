import { people, getMovies, getMovieById, addMovie, deleteMovie, getItems, getItem } from "./db";

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => people.find((person) => person.id == id),
    movies: getMovies,
    movie: (_, { id }) => getMovieById(id),
    items: (_, { max }) => getItems(max),
    item: (_, { id }) => getItem(id),
  },
  Mutation: {
    addMovie: (_, { title, score }) => addMovie(title, score),
    deleteMovie: (_, { id }) => deleteMovie(id),
  },
};

export default resolvers;
