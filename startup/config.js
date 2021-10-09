const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};

// if (!config.get("jwtPrivateKey")) {
//     console.error("FATAL ERROR");
//     process.exit(1);
//   }
