const Joi = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
    required: true,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

const validateRentals = (req) => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    rentalFee: Joi.number().required(),
  };
  return Joi.validate(req, schema);
};

module.exports.Rental = Rental;
module.exports.validate = validateRentals;
