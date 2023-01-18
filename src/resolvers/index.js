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
      let movies = [];
      const endpoint = process.env.MOVIE_DB_URI;
      try {
        const response = await axios.get(endpoint);
        if (response.data?.length > 0) {
          movies = response.data;
        }
      } catch (error) {
        return new GraphQLError("Det finns ju inga filmer här ju!!!");
      }
      return movies;
    },
  },
  Mutation: {
    createMovie: async (_, args) => {
      //Verify name, if string is empty, return error
      if ((args, title.length === 0))
        return new GraphQLError("Title must be at least 1 character long");

      //Create filePath??

      //Check if id exists
      let idAlreadyExists = true;
      if (!idAlreadyExists)
        return new GraphQLError("Den här filmen finns ju redan!");

      //Create unique id + data object
      const newMovie = {
        id: crypto.randomUUID(),
        title,
        description: description || "",
        genre: movies.ACTION,
        image: image || "",
      };

      try {
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
      }

      return newMovie;
    },
  },
};
