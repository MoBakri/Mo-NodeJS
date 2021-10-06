const express = require("express");
const { Customer, validate } = require("../model/customer");
const router = express.Router();
router.get("/", async (req, res) => {
  res.send(await Customer.find().sort("name"));
});
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.send(customer);
});
router.post("/", async (req, res, next) => {
  const customer = new Customer(req.body);
  try {
    res.send(await customer.save());
  } catch (ex) {
    let errMes = "";
    for (const field in ex.errors) {
      errMes += `${ex.errors[field].message}\n`;
    }
    res.status(400).send(errMes);
  }
  next();
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!customer) return res.status(404).send("invalid Customer Id.");
  res.send(customer);
});
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  res.send(customer);
  if (!customer) return res.status(404).send("invalid Customer Id.");
});
module.exports = router;
