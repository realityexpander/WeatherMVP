import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import CityList from "./components/CityList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
    // bind delete city in here 
    this.deleteCity = this.deleteCity.bind(this);
  }

  deleteCity(event) {
    console.log(event);
  }

  search(cityname) {
    // console.log(`${username} was searched`);
    // TODO
    $.ajax({
      url: "http://localhost:1128/city",
      method: "POST",
      data: { cityname },
      success: () => {
        console.log(`${cityname} successfully searched!`);
        this.setState({ cities });
      }
    });
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:1128/cities",
      method: "GET",
      success: cities => {
        this.setState({ cities }, () =>
          console.log(`current repos: ${this.state.cities}`)
        );
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Metaweather MVP</h1>
        <CityList deleteCity={this.deleteCity} cities={this.state.cities} />
        <Search onSearch={this.search.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
