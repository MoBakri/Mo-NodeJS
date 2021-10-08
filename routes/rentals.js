const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await Rental.find().sort("-dateOut"));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("invalid movie id");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("invalid customer id");

  const rentals = new Rental({
    customer: customer,
    movie: movie,
    rentalFee: req.body.rentalFee,
  });
  await rentals.save();
  res.send(rentals);
});
module.exports = router;
