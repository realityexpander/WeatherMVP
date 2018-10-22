import React from "react";

const ForecastItem = props => (
  <table>
    <tr>
      <td />
      <td>Forecast</td>
      <td>Temp</td>
      <td>Humidity</td>
      <td>Air Pressure</td>
      <td>Wind Speed</td>
      <td>Visibility</td>
      <td>Confidence</td>
    </tr>

    {props.city.consolidated_weather.map((item, i) => (
      <tr key={item.id}>
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
        <td>
          {precise((item.the_temp * 9) / 5 + 32)}
          ºF
        </td>
        <td>{precise(item.humidity)}%</td>​
        <td>
          {precise(item.air_pressure)}
          mBar
        </td>
        <td>
          {precise(item.wind_speed)}
          mph
        </td>
        ​<td>{precise(item.visibility)}</td>​<td>{item.predictability}%</td>​
      </tr>
    ))}
  </table>
);

function precise(x) {
  return Number.parseFloat(x).toPrecision(4);
}

export default ForecastItem;
