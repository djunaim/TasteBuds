import React, { Component } from 'react';
import './RestaurantForm.scss';
import { Link } from 'react-router-dom';

class RestaurantForm extends Component {
  render() {
    return (
      <div className="RestaurantForm">
        <h1>Restaurant Form</h1>
        <Link to="/restaurants" className="btn btn-secondary">Restaurants</Link>
      </div>
    );
  }
}

export default RestaurantForm;
