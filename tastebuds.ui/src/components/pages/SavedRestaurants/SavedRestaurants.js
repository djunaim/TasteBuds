import React, { Component } from 'react';
import './SavedRestaurants.scss';
import RestaurantDBCard from '../../shared/RestaurantDBCard/RestaurantDBCard';
import userData from '../../../helpers/data/userData';

class SavedRestaurants extends Component {
  state = {
    restaurants: [],
    user: {},
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    userData.getUserWithRestaurants(userId)
      .then((response) => {
        this.setState({ restaurants: response.restaurants });
        this.getUserById(userId);
      })
      .catch((error) => console.error(error, 'errFromAllRestaurants'));
  }

  getUserById = (userId) => {
    userData.getUserById(userId)
      .then((user) => this.setState({ user }))
      .catch((error) => console.error(error, 'errFromGetUserById'));
  }

  render() {
    const { restaurants, user } = this.state;

    return (
      <div className="SavedRestaurants">
        <div className="container justify-content-center">
          {
            user.userId === 1
              ? (<h1>My Tastes</h1>)
              : (<h1>{user.firstName}'s Tastes</h1>)
          }
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
