const request = require("request");
// const config = require("../config.js");

let getWeatherByCityname = (cityname, callback) => {
  // Use the request module to request repos for a specific
  // city from the metaweather API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const cities = [];
  const options = {
    url: "https://www.metaweather.com/api/location/search/?query=" + cityname
    // headers: {
    //   "User-Agent": "request",
    //   Authorization: `token ${config.TOKEN}`
    // }
  };

  console.log("*** metaweather.js cityname=", cityname);
  request(options, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var city = JSON.parse(body);
      console.log(
        `*** city[0] from metaweather request: ${JSON.stringify(city[0])}`
      );
      //city.forEach(city => cities.push(city));
      if (city[0] === undefined) {
        console.log("City not found in metaweather API");
        callback(404, null);
        return;
      }

      {
        const option = {
          url: "https://www.metaweather.com/api/location/" + city[0].woeid
        };
        request(option, (err, res, body) => {
          if (!err && res.statusCode === 200) {
            var city_weather = JSON.parse(body);
            var resultCity = {};
            console.log(
              `data in city_weather: ${JSON.stringify(city_weather)}`
            );
            resultCity._id = city[0].woeid;
            resultCity.woeid = city[0].woeid;
            resultCity.title = city[0].title;
            resultCity.temperature =
              (city_weather.consolidated_weather[0].the_temp * 9) / 5 + 32;
            resultCity.cur_weather =
              city_weather.consolidated_weather[0].weather_state_abbr;
            resultCity.weather_description =
              city_weather.consolidated_weather[0].weather_state_name;
            cities.push(resultCity);
            console.log("metaweather city=", JSON.stringify(resultCity));
            console.log("metaweather Cities =", JSON.stringify(cities));
            callback(null, cities);
          }
        });
      }
    } else {
      console.log(`There was an error to the request to metaweather: ${err}`);
      callback(err, null);
    }
  });
};

module.exports.getWeatherByCityname = getWeatherByCityname;
