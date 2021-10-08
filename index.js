const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/mobakridb")
  .then(() => console.log("Connecting to MongoDB..."))
  .catch((err) => console.error(err));

app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`listening on port ${port}...`));
