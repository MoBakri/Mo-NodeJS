const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const { User } = require("../model/user");
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
  if (!user) return res.status(400).send("invalid email");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.send("invalid password");

  // const token = jwt.sign(
  //   { email: loginUser.email, _id: loginUser._id },
  //   config.get("jwtPrivateKey")
  // );
  const token = user.generateAuthToken();
  res.send(token);
});
module.exports = router;
