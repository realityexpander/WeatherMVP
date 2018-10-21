const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1/weather",
  { useMongoClient: true },
  function(err) {
    if (err) console.log(err);
  }
);

let citySchema = mongoose.Schema({
  _id: Number, //woeid
  woeid: Number,
  title: String,
  temperature: Number,
  cur_weather: String,
  weather_description: String
});

let City = mongoose.model("City", citySchema);

let save = (city, callback) => {
  // This function should save a city to
  // the MongoDB

  const newCity = {
    _id: city._id,
    woeid: city.woeid,
    title: city.title,
    temperature: city.temperature,
    cur_weather: city.cur_weather,
    weather_description: city.weather_description
  };

  console.log(`*** newCity: ${JSON.stringify(newCity)}`);

  City.findOneAndUpdate(
    { _id: newCity._id },
    newCity,
    { upsert: true },
    (err, newCity) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, newCity);
      }
    }
  );
};

let delete_city = (deleteCity, callback) => {
  console.log("*** deleting city:", JSON.stringify(deleteCity));
  City.findByIdAndRemove(deleteCity, (err, data) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

let retrieve = callback => {
  City.find()
    .sort({ temperature: -1 })
    .limit(25)
    .exec((err, cities) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, cities);
      }
    });
};

module.exports.retrieve = retrieve;
module.exports.save = save;
module.exports.delete_city = delete_city;
