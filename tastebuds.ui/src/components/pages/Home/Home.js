import React, { Component } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        <Link to="/profile" className="btn btn-primary">Profile</Link>
        <Link to="/findTaste" className="btn btn-success">Restaurant Form</Link>
      </div>
    );
  }
}

export default Home;
