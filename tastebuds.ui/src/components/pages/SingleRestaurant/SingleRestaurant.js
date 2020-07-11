import React, { Component } from 'react';
import './SingleRestaurant.scss';
import restaurantData from '../../../helpers/data/restaurantData';

class SingleRestaurant extends Component {
  state = {
    restaurant: {},
  }

  componentDidMount() {
    const { restaurantId } = this.props.match.params;
    restaurantData.getRestaurant(restaurantId)
      .then((restaurant) => this.setState({ restaurant }))
      .catch((error) => console.error(error, 'errFromSingleRestaurant'));
  }

  render() {
    return (
      <div className="SingleRestaurant">
        <h1>Single Restaurant</h1>
      </div>
    );
  }
}

export default SingleRestaurant;
