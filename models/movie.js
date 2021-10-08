const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },

  numberInStock: {
    type: Number,
    min: 0,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovies = (movie) => {
  const schema = {
    title: Joi.string().required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  };
  return Joi.validate(movie, schema);
};

module.exports.Movie = Movie;
module.exports.validate = validateMovies;
