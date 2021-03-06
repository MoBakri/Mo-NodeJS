const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenres = (genre) => {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(genre, schema);
};

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenres;
