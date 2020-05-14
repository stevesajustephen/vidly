const express = require("express");
const { Movie, validate } = require("../model/movie");
const { Genres } = require("../model/genre");

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = await Genres.findById(req.body.genreId, (err, gnere) => {
    if (err) return res.status(400).send("wrong genre ID");
  }).select("name");
  let movie = new Movie({
    title: req.body.title,
    genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id, (err, movie) => {
    if (err) return res.status(400).send("wrong ID");
  });
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = await Genres.findById(req.body.genreId, (err, gnere) => {
    if (err) return res.status(400).send("wrong genre ID");
  }).select("name");
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    {
      new: true,
    },
    (err, model) => {
      if (err) return res.status(404).send("given movie does'nt exist");
    }
  );
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id, (err, movie) => {
    if (err) return res.status(404).send("Id not valid");
    res.send(movie);
  });
});

module.exports = router;
