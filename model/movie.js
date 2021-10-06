const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },

    numberInStock: {
      type: Number,
      required: true,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
    },
  })
);
const validateMovies = (movie) => {
  const schema = {
    title: Joi.string(),
    genreId: Joi.string(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  };
  return Joi.validate(movie, schema);
};

module.exports.Movie = Movie;
module.exports.validateMovies = validateMovies;
