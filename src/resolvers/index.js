const path = require("path");
const fsPromises = require("fs/promises");

const {
  fileExists,
  readJsonFile,
  deleteFile,
  getDirectoryFileNames,
} = require("../utils/fileHandling");

const { GraphQLError, printType } = require("graphql");
const crypto = require("crypto");
const { movieGenre } = require("../enums/movies");

const axios = require("axios").default;

exports.resolvers = {
  Query: {
    getAllMovies: async (_, args) => {
      let allMovies = [];
      const endpoint = process.env.MOVIE_DB_URI;
      try {
        const response = await axios.get(endpoint);
        if (response.data?.length > 0) {
          allMovies = response.data;
        }
      } catch (error) {
        return new GraphQLError("Det finns ju inga filmer här ju!!!");
      }
      return allMovies;
    },
  },
  Mutation: {
    createMovie: async (_, args) => {
      //Skapa input-variabler
      const { title, description, genre, image } = args.input;

      //Verify name, if string is empty, return error
      if ((args, title.length === 0))
        return new GraphQLError("Title must be at least 1 character long");

      //Create unique id + data object
      const newMovie = {
        id: crypto.randomUUID(),
        title,
        description: description || "",
        genre: movieGenre.ACTION,
        image: image || "",
      };

      //Check if id exists
      const endpoint = process.env.MOVIE_DB_URI;
      console.log(endpoint);

      const response = await axios.get(endpoint + `/search?id=${newMovie.id}`);

      allMovies = response.data;

      console.log(allMovies);

      if (allMovies.length === 0) {
        try {
          const response = await axios.post(
            endpoint,
            {
              data: [newMovie],
            },
            {
              headers: {
                "Accept-Encoding": "gzip,deflate,compress",
              },
            }
          );
        } catch (error) {
          console.error(error);
          return new GraphQLError("Det gick inte att skapa filmen...");
        }
      }
      /* let idAlreadyExists = true;
      if (!idAlreadyExists)
        return new GraphQLError("Den här filmen finns ju redan!"); */

      /* try {
        const endpoint = process.env.MOVIE_DB_URI;
        const response = await axios.post(
          endpoint,
          {
            data: [newMovie],
          },
          {
            headers: {
              "Accept-Encoding": "gzip,deflate,compress",
            },
          }
        );
      } catch (error) {
        console.error(error);
        return new GraphQLError("Det gick inte att skapa filmen...");
      } */

      return newMovie;
    },
  },
};
