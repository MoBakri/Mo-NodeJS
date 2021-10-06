const { Movie, validateMovies } = require("../model/movie");
const { Genre } = require("../model/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await Movie.find().sort("title"));
});
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});
router.post("/", async (req, res) => {
  const { error } = validateMovies(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid genre id");
  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  try {
    res.send(movie);
  } catch (ex) {
    let errMes = "";
    for (const field in ex.errors) {
      errMes += `${ex.errors[field].message}\n`;
    }
    res.status(400).send(errMes);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovies(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid genre id");

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  if (!movie) return res.status(404).send("invalid Movie Id.");
  res.send(movie);
});
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  res.send(movie);
  if (!movie) return res.status(404).send("invalid Movie Id.");
});

module.exports = router;
