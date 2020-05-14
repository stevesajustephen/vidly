const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const genres = require("./router/genres");
const home = require("./router/home");
const customers = require("./router/ customers");
const movies = require("./router/movies");
const rentals = require("./router/rentals");
const users = require("./router/users");
const auth = require("./router/auth");
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("connected to mongodb....");
  })
  .catch((err) => {
    console.log("errrrrrrrrrrrrr.... ", err);
  });

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // parses req.body
app.use(logger);
app.use(helmet()); // add additional security headers to the response

if (app.get("env") === "development") {
  app.use(morgan("tiny")); // logger for nodejs
}

app.use("/login", auth);
app.use("/api/users", users);
app.use("/api/rentals", rentals);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
