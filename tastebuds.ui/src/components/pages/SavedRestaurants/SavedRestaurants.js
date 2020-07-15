import React, { Component } from 'react';
import './SavedRestaurants.scss';
import restaurantData from '../../../helpers/data/restaurantData';
import RestaurantDBCard from '../../shared/RestaurantDBCard/RestaurantDBCard';

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
    const { restaurants } = this.state;

    return (
      <div className="SavedRestaurants container">
        <h1>My Tastes</h1>
        <div className="row">
          {
            restaurants.map((restaurant) => <RestaurantDBCard key={restaurant.id} restaurant={restaurant} />)
          }
        </div>
      </div>
    );
  }
}

export default SavedRestaurants;
