const winston = require("winston");
module.exports = function (err, req, res) {
  winston.error(err.message, err);
  res.status(500).send("Somethig failed.");

  //helper method
  //error
  //warn
  //info
  //vebose
  //debug
  //silly
};
