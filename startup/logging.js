const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  //or

  // winston.handleExceptions(
  //   new winston.transports.Console({ colorize: true, prettyPrint: true }),
  //   new winston.transports.File({ filename: "uncaughtException.log" })
  // );

  process.on("unhandledRejection", (ex) => {
    // console.log("we cought unhandled Rejection.");
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: "mongodb://localhost/mobakridb",
  // level: "info", // that means what will log in db are error, warn,info not the rest of the helper methods
  // });

  //caught uncaughtException like -->
  // throw new Error("Something failed during startup");

  //caught unhandledRejection like --->
  // const p = Promise.reject(new Error("Something failed miseraly"));
  // p.then(() => console.log("Done"));

  // app.use(function (err, req, res, next) {
  //   res.status(500).send("Somethig failed.");
  // });
};
