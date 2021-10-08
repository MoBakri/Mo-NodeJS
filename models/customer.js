const Joi = require("joi");

const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
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
  })
);

const validateCustomers = (customer) => {
  const schema = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
};

module.exports.Customer = Customer;
module.exports.validate = validateCustomers;
