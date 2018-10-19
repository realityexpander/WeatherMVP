const express = require("express");
const db = require("../database/index.js");
const helpers = require("../helpers/github.js");
const bodyParser = require("body-parser");
let app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/repos", function(req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const username = req.body.username;
  // console.log(username);
  helpers.getReposByUsername(username, (err, repos) => {
    if (err) {
      throw err;
    } else {
      repos.forEach(repo => {
        db.save(repo, (err, repo) => {
          if (err) {
            throw err;
          } else {
            console.log(`repo added: ${repo}`);
          }
        });
      });
    }
    //DANGER! DANGER!
    console.log("All repos were searched");
    res.status(201).send();
  });
});

app.get("/repos", function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.retrieve((err, repos) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(repos);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
