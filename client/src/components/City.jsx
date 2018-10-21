import React from "react";

const City = props => (
  <tr>
    <td>{props.city.title}</td>
    <td>{props.city.last_weather}</td>
    <td>{~~props.city.temperature + "ºF"}</td>
    <td>
      <img
        src={
          "https://www.metaweather.com/static/img/weather/png/64/" +
          props.city.cur_weather +
          ".png"
        }
      />{" "}
    </td>
    <td>{props.city.weather_description}</td>
    <td>
      {" "}
      <button onClick={event => props.deleteCity(event, props.city)}>
        Delete
      </button>
    </td>
  </tr>
);

export default City;
