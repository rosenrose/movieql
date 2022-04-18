export const people = [
  {
    id: 0,
    name: "con",
    age: 20,
    gender: "male",
  },
  {
    id: 1,
    name: "sole",
    age: 30,
    gender: "female",
  },
  {
    id: 2,
    name: "log",
    age: 40,
    gender: null,
  },
];

let movies = [
  {
    id: 0,
    title: "Star Wars - The new one",
    score: 1,
  },
  {
    id: 1,
    title: "Avengers - The new one",
    score: 4.5,
  },
  {
    id: 2,
    title: "The Godfather I",
    score: 5,
  },
  {
    id: 3,
    title: "Logan",
    score: 3,
  },
];

export const getMovies = () => movies;
export const getMovieById = (id) => movies.find((movie) => movie.id == id);
export const addMovie = (title, score) => {
  const newMovie = {
    id: movies.length,
    title,
    score,
  };
  movies.push(newMovie);
  return newMovie;
};
export const deleteMovie = (id) => {
  const filteredMovies = movies.filter((movie) => movie.id != id);

  if (movies.length === filteredMovies.length) {
    return false;
  } else {
    movies = filteredMovies;
    return true;
  }
};
