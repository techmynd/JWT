const http = require("http");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//console.log(process.env.MONGO_DB);
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization",
  );
  // res.header("Access-Control-Allow-Origin", "http://www.onlymysite.com");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  // next is necessary
  next();
});

app.use((req, res, next) => {
  res.status(200).json({
    message: "it works...!",
  });
});
module.exports = app;
// http://localhost:5000/

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening to port ${port} ... http://localhost:${port}/`);
});
