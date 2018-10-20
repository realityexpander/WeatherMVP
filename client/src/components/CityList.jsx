import React from "react";
import City from "./City.jsx";

const CityList = props => (
  <div>
    <h4> Current Cities Tracked </h4>
    <table>
      <tbody>
        {props.cities[0]
          ? props.cities.map((city, i) => <City deleteCity={props.deleteCity} city={city} key={i} />)
          : ""}
      </tbody>
    </table>
  </div>
);

export default CityList;
