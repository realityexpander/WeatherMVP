const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/weather", { useMongoClient: true }, function (err) {
  if (err) console.log(err);
});

let citySchema = mongoose.Schema({
  _id: Number,
  name: String,
  temperature: Number,
  cur_weather: String,
  description: String
});

let City = mongoose.model("City", citySchema);

let save = (city, callback) => {
  // This function should save a city to
  // the MongoDB
  const newCity = {
    _id: city.woeid,
    name: city.title,
    temperature: city.temperature,
    cur_weather: city.cur_weather,
    description: city.description
  };

  console.log(`newCity: ${JSON.stringify(newCity)}`);

  City.findOneAndUpdate(
    { _id: newCity._id },
    newCity,
    { upsert: true },
    (err, city) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, city);
      }
    }
  );
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
