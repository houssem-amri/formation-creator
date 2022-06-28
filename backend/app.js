const express = require("express"); // import express
const bodyParser = require("body-parser"); // import body-parser
const mongoose = require("mongoose"); // import mongoose*
const path = require("path"); // predifini en node js
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/SoccerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use("/images", express.static(path.join("backend/images")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});


app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/matches"));
app.use("/api", require("./routes/players"));


module.exports = app;
