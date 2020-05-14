const express = require("express");
const router = express.Router();

const { Genres, validate } = require("../model/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const genres = await Genres.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { body } = req;
  const { error } = validate(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Genres({ name: body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { body } = req;
  const { error } = validate(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = await Genres.findByIdAndUpdate(
    req.params.id,
    {
      name: body.name,
    },
    { new: true },
    (error, model) => {
      if (error) return;
    }
  );
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Id not valid");
  res.send(genre);
});

module.exports = router;
