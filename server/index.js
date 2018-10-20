// function (exports, require, module, __filename, __dirname) {
const express = require("express");
const db = require("../database/index.js");
const helpers = require("../helpers/metaweather.js");
const bodyParser = require("body-parser");
let app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/city", function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const cityname = req.body.cityname;
  // console.log(username);
  helpers.getWeatherByCityname(cityname, (err, cities) => {
    if (err) {
      throw err;
    } else {
      cities.forEach(city => {
        console.log('cities forEach city=', JSON.stringify(city));
        db.save(city, (err, city) => {
          if (err) {
            throw err;
          } else {
            console.log(`city added: ${city}`);
          }
        });
      });
    }

    console.log("All cities were searched");
    res.status(201).send();
  });
});

app.get("/cities", function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.retrieve((err, cities) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(cities);
    }
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening for weather requests on port ${port}`);
});

// };