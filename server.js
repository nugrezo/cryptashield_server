// require necessary NPM packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require("./config/db");

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741;
const clientDevPort = 7165;

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose
  .connect(db, {})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// instantiate express application object
const app = express();

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
  })
);

// define port for API to run on
const port = process.env.PORT || serverDevPort;

// The method `.use` sets up middleware for the Express application
app.use(express.json());
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }));

// run API on designated port (4741 in this case)
app.listen(port, () => {
  console.log("listening on port " + port);
});

// needed for testing
module.exports = app;
