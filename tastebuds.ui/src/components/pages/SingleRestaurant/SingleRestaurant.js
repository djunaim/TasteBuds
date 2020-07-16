import React, { Component } from 'react';
import './SingleRestaurant.scss';
import Card from 'react-bootstrap/Card';
import restaurantData from '../../../helpers/data/restaurantData';
import userData from '../../../helpers/data/userData';

class SingleRestaurant extends Component {
  state = {
    restaurant: {},
    location: {},
    highlights: [],
    restaurantInProfile: false,
  }

  componentDidMount() {
    const { restaurantId } = this.props.match.params;
    restaurantData.getRestaurant(restaurantId)
      .then((restaurant) => this.setState({ restaurant, location: restaurant.location, highlights: restaurant.highlights }))
      .catch((error) => console.error(error, 'errFromSingleRestaurant'));
    this.restaurantProfileCheck();
  }

  restaurantProfileCheck = () => {
    const { restaurantId } = this.props.match.params;
    restaurantData.getSingleRestaurant(restaurantId)
      .then((restaurant) => {
        if (restaurant.length !== 0) {
          this.setState({ restaurantInProfile: true });
        }
      })
      .catch((error) => console.error(error, 'errFromRestaurantProfileCheck'));
  }

  addRestaurantToProfile = () => {
    const { restaurantId } = this.props.match.params;
    const userId = sessionStorage.getItem('userId');
    const newUserRestaurant = {
      // eslint-disable-next-line radix
      restaurantId: parseInt(restaurantId),
      // eslint-disable-next-line radix
      userId: parseInt(userId),
    };
    userData.addRestaurantToProfile(newUserRestaurant)
      .then(() => this.props.history.push('/profile/savedRestaurants'))
      .catch((error) => console.error(error, 'errFromAddRestaurantToProfile'));
  }

  addRestaurantEvent = (e) => {
    e.preventDefault();
    const { restaurantId } = this.props.match.params;
    const { location, restaurant } = this.state;
    const newRestaurant = {
      // eslint-disable-next-line radix
      restaurantId: parseInt(restaurantId),
      address: location.address,
      name: restaurant.name,
      url: restaurant.url,
      hours: restaurant.timings,
      phoneNumber: restaurant.phone_numbers,
      averageCostForTwo: restaurant.average_cost_for_two,
      thumbNail: restaurant.thumb,
    };
    restaurantData.addRestaurant(newRestaurant)
      .then(() => this.addRestaurantToProfile())
      .catch((error) => console.error(error, 'errFromAddRestaurant'));
  }

  deleteUserRestaurant = () => {
    const { restaurantId } = this.props.match.params;
    userData.deleteUserRestaurant(restaurantId)
      .then(() => this.props.history.push('/profile/savedRestaurants'))
      .catch((error) => console.error(error, 'errFromDeleteUserRestaurant'));
  }

  deleteRestaurantEvent = (e) => {
    e.preventDefault();
    const { restaurantId } = this.props.match.params;
    restaurantData.deleteRestaurant(restaurantId)
      .then(() => this.deleteUserRestaurant())
      .catch((error) => console.error(error, 'errFromDeleteRestauant'));
  }

  render() {
    const {
      restaurant,
      highlights,
      location,
      restaurantInProfile,
    } = this.state;

    return (
      <div className="SingleRestaurant container">
        <h1>{restaurant.name}</h1>
        <Card>
          <Card.Img variant="top" src={restaurant.featured_image} roundedcircle />
          <Card.Body>
            <Card.Text>
              Hours: {restaurant.timings}
            </Card.Text>
              Highlights:
              {
                highlights.map((highlight) => <Card.Text>{highlight}</Card.Text>)
              }
            <Card.Text>
              Phone Number: {restaurant.phone_numbers}
            </Card.Text>
             <Card.Text>
              Website: {restaurant.url}
            </Card.Text>
            <Card.Text>
              Location: {location.address}
            </Card.Text>
            <Card.Footer>
              <button className="btn btn-secondary" onClick={this.addRestaurantEvent} >This is my Taste!</button>
              {
                restaurantInProfile ? (<button className="btn btn-danger" onClick={this.deleteRestaurantEvent} >Remove from My Taste</button>) : ('')
              }
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleRestaurant;
