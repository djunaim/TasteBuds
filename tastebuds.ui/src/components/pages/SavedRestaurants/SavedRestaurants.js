import React, { Component } from 'react';
import './SavedRestaurants.scss';
import restaurantData from '../../../helpers/data/restaurantData';

class SavedRestaurants extends Component {
  state = {
    restaurants: [],
  }

  componentDidMount() {
    restaurantData.getAllRestaurants()
      .then((restaurants) => this.setState({ restaurants }))
      .catch((error) => console.error(error, 'errFromAllRestaurants'));
  }

  render() {
    return (
      <div className="SavedRestaurants">
        <h1>My Restaurants</h1>
      </div>
    );
  }
}

export default SavedRestaurants;
