const express = require("express");
const auth = require("../middleware/auth");
const { Genre, validate } = require("../model/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort("name");
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  // const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Not Found");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  // const token = req.header("x-auth-token");
  // if (!token) return res.status(401).send("access denied.");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });

  res.send(await genre.save());
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Not Found");
  // const genre = genres.find((g) => g.id === parseInt(req.params.id));
  // genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  // const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Not Found");
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);
  res.send(genre);
});

module.exports = router;
