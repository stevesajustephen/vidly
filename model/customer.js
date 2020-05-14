const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: { type: String, required: true, minlength: 3, maxlength: 10 },
    phone: { type: Number, minlength: 5, maxlength: 10, required: true },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.number().required(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
