import React, { Component } from 'react';
import './App.scss';
import locationData from '../helpers/data/locationData';

class App extends Component {
  state = {
    city: 'Nashville',
  }

  componentDidMount() {
    locationData.getLocation(this.state.city);
  }

  render() {
    return (
      <div className="App">
        <button className="btn btn-danger">poo</button>
      </div>
    );
  }
}

export default App;
