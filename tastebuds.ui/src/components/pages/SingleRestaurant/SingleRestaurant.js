/* eslint-disable max-len */
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

  deleteUserRestaurantEvent = (e) => {
    e.preventDefault();
    const { restaurantId } = this.props.match.params;
    userData.deleteUserRestaurant(restaurantId)
      .then(() => this.deleteRestaurant())
      .catch((error) => console.error(error, 'errFromDeleteUserRestaurant'));
  }

  deleteRestaurant = () => {
    const { restaurantId } = this.props.match.params;
    restaurantData.deleteRestaurant(restaurantId)
      .then(() => this.props.history.push('/profile/savedRestaurants'))
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
          {
            restaurant.featured_image !== ''
              ? (<Card.Img variant="top" src={restaurant.featured_image} />)
              : (<Card.Img variant="top" src="https://images.unsplash.com/photo-1580906462791-1ccc3195aa34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />)
          }
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
              {
                restaurantInProfile ? (<button className="btn btn-danger" onClick={this.deleteUserRestaurantEvent} >Remove from My Taste</button>) : (<button className="btn btn-secondary" onClick={this.addRestaurantEvent} >This is my Taste!</button>)
              }
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleRestaurant;
