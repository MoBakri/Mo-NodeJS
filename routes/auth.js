const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

const validate = (req) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(req, schema);
};

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("You entered an invalid Email.");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send("You entered an invalid password");

  const token = user.genAuthToken();
  res.send(token);
});
module.exports = router;
