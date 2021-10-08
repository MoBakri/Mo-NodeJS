const { Customer, validate } = require("../models/customer");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customers = new Customer(_.pick(req.body, ["name", "phone", "isGold"]));
  await customers.save();
  res.send(customers);
});

router.put("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(400).send("invalid id");

  customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(400).send("invalid id");

  customer = await Customer.findByIdAndRemove(req.params.id);
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.send(customer);
});

module.exports = router;
