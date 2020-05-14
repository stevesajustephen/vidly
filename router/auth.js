const express = require("express");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const { User } = require("../model/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send("invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });

  return schema.validate(user);
}

module.exports = router;
