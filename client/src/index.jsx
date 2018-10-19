import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  search(username) {
    // console.log(`${username} was searched`);
    // TODO
    $.ajax({
      url: "http://localhost:1128/repos",
      method: "POST",
      data: { username },
      success: () => console.log(`${username} successfully searched!`)
    });
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:1128/repos",
      method: "GET",
      success: repos => {
        this.setState({ repos }, () =>
          console.log(`current repos: ${this.state.repos}`)
        );
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
