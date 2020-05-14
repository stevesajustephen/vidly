const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../model/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  await Customer.findById(req.params.id, (err, customer) => {
    if (err) return res.status(404).send("customer ID not valid");
    res.send(customer);
  });
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    {
      new: true,
    },
    (err, customer) => {
      if (err)
        return res.status(404).send("customer with given ID is not found");
    }
  );
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    return res.status(404).send("customer ID does'nt exist");
  }
  res.send(customer);
});

module.exports = router;
