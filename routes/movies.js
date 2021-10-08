const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid genre id");
  const movies = new Movie({
    title: req.body.title,
    genre: genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movies.save();
  res.send(movies);
});

router.put("/:id", async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send("invalid id");

  movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (req.body.genreId) {
    const genre = await Genre.findById(req.body.genreId);
    movie.genre = genre;
  }
  await movie.save();
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send("invalid id");

  movie = await Movie.findByIdAndRemove(req.params.id);
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

module.exports = router;
