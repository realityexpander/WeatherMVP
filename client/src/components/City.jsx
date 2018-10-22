import React from "react";
import ForecastItem from "./ForecastItem.jsx";

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

    {props.showForecastCity === props.city._id ? (
      <ForecastItem city={props.city} />
    ) : (
      ""
    )}
  </div>
);

export default City;
