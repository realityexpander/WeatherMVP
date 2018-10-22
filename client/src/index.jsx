import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import CityList from "./components/CityList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      showForecastCity: null
    };
    // bind delete city in here
    this.deleteCity = this.deleteCity.bind(this);
    this.toggleForecast = this.toggleForecast.bind(this);
  }

  toggleForecast(event, city) {
    // toggle a single city
    console.log("*** Forecast show city=", city._id);

    if (this.state.showForecastCity === null)
      this.state.showForecastCity = city._id;
    else if (this.state.showForecastCity !== city._id) {
      this.state.showForecastCity = city._id;
    } else {
      this.state.showForecastCity = null;
    }

    this.setState({ showForecastCity: this.state.showForecastCity }); // todo can just use showForecastCity
  }

  deleteCity(event, city) {
    console.log("*** DeleteCity event:", event, "city=", city);
    $.ajax({
      url: "http://localhost:1128/delete",
      method: "DELETE",
      data: { city_id: city._id },
      success: data => {
        console.log(`*** DELETE: ${city} successfully deleted!`);

        // remake a new list of cities (using delete is not optimal for arrays)
        let oldCities = this.state.cities;
        this.state.cities = [];
        for (let i = 0; i < oldCities.length; i++) {
          if (oldCities[i]._id !== city._id) {
            this.state.cities.push(oldCities[i]);
          }
        }
        this.setState({ cities: this.state.cities });
      }
    });
  }

  search(cityname) {
    // console.log(`${username} was searched`);
    // TODO
    $.ajax({
      url: "http://localhost:1128/city",
      method: "POST",
      data: { cityname },
      success: city => {
        console.log(`CLIENT: ${cityname} successfully searched!`);
        for (let i of this.state.cities) {
          if (city[0].woeid === i._id) {
            console.log("City already exists.");
            return;
          }
        }
        this.setState({ cities: this.state.cities.concat(city) });
      }
    });
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:1128/cities",
      method: "GET",
      success: cities => {
        this.setState({ cities }, () =>
          console.log(`Current Cities: ${JSON.stringify(this.state.cities)}`)
        );
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Metaweather MVP</h1>
        <CityList
          deleteCity={this.deleteCity}
          cities={this.state.cities}
          toggleForecast={this.toggleForecast}
          showForecastCity={this.state.showForecastCity}
        />
        <Search onSearch={this.search.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
