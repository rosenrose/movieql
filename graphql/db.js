import "dotenv/config";
import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.resolve(error);
  }
);

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

const id = "UUyWiQldYO_-yeLJC0j5oq2g";
const API_KEY = process.env.API_KEY;
const ITEMS_URL = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&key=${API_KEY}&part=snippet,contentDetails`;
const ITEM_URL = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails`;

export const getItems = async (max) => {
  let request_url;
  if (max > 0) {
    request_url = `${ITEMS_URL}&maxResults=${max}`;
  } else {
    request_url = ITEMS_URL;
  }

  const items = (
    await axios.get(request_url, {
      responseType: "json",
    })
  ).data.items;

  return items.map(async (item) => ({
    id: item.contentDetails.videoId,
    ...(await extractInfo(item)),
  }));
};

export const getItem = async (id) => {
  const item = (
    await axios.get(`${ITEM_URL}&id=${id}`, {
      responseType: "json",
    })
  ).data.items[0];

  return {
    id: item.id,
    ...(await extractInfo(item)),
  };
};

async function extractInfo(item) {
  const { title, description, publishedAt: date, thumbnails } = item.snippet;
  const info = { title, description, date };
  const thumbnail = thumbnails[Object.keys(thumbnails).at(-1)].url;

  if (thumbnail.endsWith("maxresdefault.jpg")) {
    return { ...info, thumbnail };
  } else {
    const availableRes = ["maxresdefault", "sddefault", "hqdefault", "mqdefault", "default"];

    for (const res of availableRes) {
      const maxres = thumbnail.replace(/[^\/]+(?=.jpg)/, res);
      const response = await axios.get(maxres);

      if (response.request.res.statusCode == 200) {
        return { ...info, thumbnail: maxres };
      }
    }

    return { ...info, thumbnail: "" };
  }
}
