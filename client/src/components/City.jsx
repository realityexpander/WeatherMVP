import React from "react";

const City = props => (
  <tr>
    <td onClick={props.deleteCity}>
      {props.city.name}
    </td>
    <td>{props.city.last_weather}</td>
    <td>{props.city.temperature}</td>
  </tr>
);

export default City;
