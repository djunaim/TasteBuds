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
      <div className="SavedRestaurants">
        <h1>My Restaurants</h1>
        {
          restaurants.map((restaurant) => <RestaurantDBCard key={restaurant.id} restaurant={restaurant} />)
        }
      </div>
    );
  }
}

export default SavedRestaurants;
