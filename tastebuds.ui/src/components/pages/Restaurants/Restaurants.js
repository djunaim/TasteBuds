import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Restaurants.scss';

class Restaurants extends Component {
  state = {
    restaurantId: 1,
  }

  static propTypes = {
    restaurants: PropTypes.array,
  }

  render() {
    const { restaurants } = this.props;

    const { restaurantId } = this.state;
    return (
      <div className="Restaurants">
        <h1>Restaurants</h1>
        <Link to={`/restaurants/${restaurantId}`} className="btn btn-danger">Single Restaurant</Link>
      </div>
    );
  }
}

export default Restaurants;
