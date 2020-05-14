const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 10 },
});

const Genres = mongoose.model("Genres", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(10),
  });
  return schema.validate(genre);
}

exports.Genres = Genres;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
