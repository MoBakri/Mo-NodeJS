const { Genre, validate } = require("../models/genre");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/", async (req, res) => {
  const Genres = await Genre.find();
  res.send(Genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genres = new Genre(_.pick(req.body, ["name", "phone", "isGold"]));
  await genres.save();
  res.send(genres);
});

router.put("/:id", async (req, res) => {
  let genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(400).send("invalid id");

  genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  let genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(400).send("invalid id");

  genre = await Genre.findByIdAndRemove(req.params.id);
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  res.send(genre);
});

module.exports = router;
