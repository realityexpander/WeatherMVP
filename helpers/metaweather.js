const request = require("request");
const config = require("../config.js");

let getWeatherByCityname = (cityname, callback) => {
  // Use the request module to request repos for a specific
  // city from the metaweather API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const cities = [];
  const options = {
    url: "https://www.metaweather.com/api/location/search/?query=" + cityname,
    // headers: {
    //   "User-Agent": "request",
    //   Authorization: `token ${config.TOKEN}`
    // } 
  };

  console.log('*** metaweather.js cityname=', cityname);
  request(options, function (err, response, body) {
    if (!err && response.statusCode === 201) {
      var city = JSON.parse(body);
      console.log(`data in metaweather request: ${JSON.stringify(data[0])}`);
      data.forEach(city => cities.push(city));
      callback(null, cities);
    } else {
      console.log(`There was an error to the request to metaweather: ${err}`);
      callback(err, null);
    }
  });
};

module.exports.getWeatherByCityname = getWeatherByCityname;
