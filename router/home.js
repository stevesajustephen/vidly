const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "pug", h1: "PUG is welcoming you, welcome..." });
});

module.exports = router;
