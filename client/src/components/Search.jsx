import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h4>Add your favorite cities</h4>
        Enter a city name:{" "}
        <input value={this.state.term} onChange={this.onChange.bind(this)} />
        <button onClick={() => { this.props.onSearch(this.state.term); this.setState({ term: '' }); }}>
          Add Cities{" "}
        </button>
      </div >
    );
  }
}

export default Search;
