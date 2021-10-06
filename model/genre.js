const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenres = (VTG) => {
  // validate this genre
  const schema = {
    name: Joi.string().min(5).required(),
  };
  return Joi.validate(VTG, schema);
};

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenres;
