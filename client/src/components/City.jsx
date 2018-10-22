import React from "react";

const City = props => (
  <div>
    <tr>
      <td>{props.city.title}</td>
      <td>{props.city.last_weather}</td>
      <td>{~~props.city.temperature + "ºF"}</td>
      <td>{props.city.humidity + "%"}</td>
      <td>
        <img
          src={
            "https://www.metaweather.com/static/img/weather/png/64/" +
            props.city.cur_weather +
            ".png"
          }
          style={{ width: "70%", height: "70%" }}
        />{" "}
      </td>
      <td>{props.city.weather_description}</td>
      <td>
        {" "}
        <button onClick={event => props.deleteCity(event, props.city)}>
          Delete
        </button>
        <button onClick={event => props.toggleForecast(event, props.city)}>
          Toggle Forecast
        </button>
      </td>
    </tr>

    {props.showForecastCity === props.city._id
      ? props.city.consolidated_weather.map((item, i) => {
          // console.log(item);
          return (
            <table>
              {i === 0 ? (
                <tr>
                  {" "}
                  <td />
                  <th>Forecast</th>
                  <th>Temp</th>
                  <th>Humidity</th>
                  <th>Air Pressure</th>
                  <th>Wind Speed</th>
                  <th>Visibility</th>
                  <th>Confidence</th>
                </tr>
              ) : (
                ""
              )}

              <tr key={item.id}>
                {" "}
                <td>
                  <img
                    src={
                      "https://www.metaweather.com/static/img/weather/ico/" +
                      item.weather_state_abbr +
                      ".ico"
                    }
                    style={{ width: "40%", height: "40%" }}
                  />
                </td>
                <td>{item.weather_state_name}</td>
                <td>{item.the_temp}</td>
                <td>{item.humidity}</td>​<td>{item.air_pressure}</td>​
                <td>{item.wind_speed}</td>​<td>{item.visibility}</td>​
                <td>{item.predictability}</td>​
              </tr>
            </table>
          );
        })
      : ""}
  </div>
);

export default City;
