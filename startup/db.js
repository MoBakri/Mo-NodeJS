const winston = require("winston");
const mongoose = require("mongoose");
const Fawn = require("fawn");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/mobakridb")
    .then(() => winston.info("Connecting to MongoDB..."));
  Fawn.init(mongoose);
};
