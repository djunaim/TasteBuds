import React, { Component } from 'react';
import './SavedRestaurants.scss';
import RestaurantDBCard from '../../shared/RestaurantDBCard/RestaurantDBCard';
import userData from '../../../helpers/data/userData';

class SavedRestaurants extends Component {
  state = {
    restaurants: [],
  }

  componentDidMount() {
    const userId = sessionStorage.getItem('userId');
    userData.getUserWithRestaurants(userId)
      .then((response) => this.setState({ restaurants: response.restaurants }))
      .catch((error) => console.error(error, 'errFromAllRestaurants'));
  }

  render() {
    const { restaurants } = this.state;

    return (
      <div className="SavedRestaurants">
        <div className="container justify-content-center">
          <h1>My Tastes</h1>
          <div className="row">
            {
              restaurants.map((restaurant) => <RestaurantDBCard key={restaurant.restaurantId} restaurant={restaurant} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SavedRestaurants;
