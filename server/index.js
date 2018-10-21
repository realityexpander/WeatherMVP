// function (exports, require, module, __filename, __dirname) {
const express = require("express");
const db = require("../database/index.js");
const helpers = require("../helpers/metaweather.js");
const bodyParser = require("body-parser");
let app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/city", function(req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const cityname = req.body.cityname;
  // console.log(username);
  helpers.getWeatherByCityname(cityname, (err, cities) => {
    if (err) {
      console.log("*** City does not exist");
    } else {
      console.log("cities city=", JSON.stringify(cities[0]));
      db.save(cities[0], (err, newcity) => {
        if (err) {
          console.log("*** City does not exist");
        } else {
          console.log(`city added: ${JSON.stringify(cities[0])}`);
        }
        res.status(201).send(cities);
      });
    }
  });
});

app.get("/cities", function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 hottest cities // todo
  console.log("*** Get cities");
  db.retrieve((err, cities) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(cities);
    }
  });
});

app.delete("/delete", function(req, res) {
  db.delete_city(req.body.city_id, (err, data) => {
    if (err) {
      console.log("*** Delete err:", err);
      res.status(500).end();
      return;
    } else {
      res.status(200).json(data);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening for weather requests on port ${port}`);
});

// };
