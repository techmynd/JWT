const express = require("express");
const app = express();
const JWT = require("jsonwebtoken");

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
  const token = JWT.sign({ user }, "MY_SECRET_KEY");
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
    res.sendStatus(403);
  }
}

// protected route
app.get("/api/data", checkToken, function(req, res) {
  // verify token
  JWT.verify(req.token, "MY_SECRET_KEY", function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      /////////////////////////
      // protected data
      ////////////////////////
      res.json({
        type: "Protected",
        data: [
          { Name: "Adnan", Age: 50 },
          { Name: "Jane", Age: 30 },
          { Name: "John", Age: 20 },
        ],
        data: data,
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
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozfSwiaWF0IjoxNTYyMDE0OTE3fQ.5R9PYFKia1VSh6vL34jDoC_Ying5XPfSS_i9HfFHHEA
*/

app.listen(5000, function() {
  console.log("...http://localhost:5000...");
});
