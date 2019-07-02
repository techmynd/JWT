const express = require("express");
const app = express();
const JWT = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

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

app.get("/", function(req, res) {
  res.send(`
  <pre>
    Welcome...

    API Access URL: http://localhost:5000/api
  </pre>
  `);
});

app.get("/api", function(req, res) {
  res.send(`
  <pre>
    Welcome to API...

    Use an Authorization header to access end point:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoint(s) are available:
    GET /api/data
  </pre>
  `);
});

// authentication route
app.post("/api/auth", function(req, res) {
  // fake user
  const user = { id: 3 };
  // generate token
  const token = JWT.sign({ user }, secretKey);
  res.json({
    token: token,
  });
});
// use postman to get key
// POST
// http://localhost:5000/api/auth
// get auth key

function checkToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send({ error: "Forbidden" });
  }
}

// protected route
app.get("/api/data", checkToken, function(req, res) {
  // verify token
  JWT.verify(req.token, secretKey, function(err, dataa) {
    if (err) {
      res.status(403).send({ error: "Forbidden" });
    } else {
      /////////////////////////
      // show protected data
      ////////////////////////
      res.json({
        persons: [
          { Name: "Adnan", Age: 50 },
          { Name: "Jane", Age: 30 },
          { Name: "John", Age: 20 },
        ],
        //dataa: dataa,
      });
      /////////////////////////
    }
  });
});

// GET
// http://localhost:5000/api/data
// key: Authorization
// value
/*
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozfSwiaWF0IjoxNTYyMDM1MTE1fQ.GniTbwlz5G1Mk3s-2o7JxJi1TfwOS6ivdGmzlCi53Tk
*/

app.listen(5000, function() {
  console.log("//API//...http://localhost:5000...");
  console.log("//CLIENT//...http://localhost:3000...");
});
