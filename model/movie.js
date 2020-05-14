const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true },
    dailyRentalRate: { type: Number, required: true },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
