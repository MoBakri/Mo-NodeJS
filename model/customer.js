const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
);
const validateCustomers = (customer) => {
  const schema = {
    name: Joi.string(),
    phone: Joi.number().integer().positive().min(9999).max(999999999),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
};

module.exports.Customer = Customer;
module.exports.validate = validateCustomers;
