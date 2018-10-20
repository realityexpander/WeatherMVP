import React from "react";

const City = props => (
  <tr>
    <td onClick={props.deleteCity}>
      {props.city.name}
    </td>
    <td>{props.city.last_weather}</td>
    <td>{~~(props.city.temperature) + 'ºF'}</td>
    <td><img src={"https://www.metaweather.com/static/img/weather/png/64/" + props.city.cur_weather + ".png"} /> </td>
    <td>{props.city.description}</td>
  </tr>
);

export default City;
