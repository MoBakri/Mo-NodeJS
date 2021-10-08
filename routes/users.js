const { User, validate } = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(_.pick(req.body, ["username", "email", "password"]));

  const dubEmail = await User.findOne({ email: req.body.email });
  if (dubEmail) return res.status(400).send("you are already registered.");

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.genAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "username", "email"]));
});

module.exports = router;
