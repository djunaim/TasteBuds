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
    buds: [],
  }

  componentDidMount() {
    const { restaurantId } = this.props.match.params;
    restaurantData.getRestaurant(restaurantId)
      .then((restaurant) => {
        this.setState({ restaurant, location: restaurant.location, highlights: restaurant.highlights });
        this.restaurantProfileCheck();
        this.getSingleRestaurantWithUsers();
      })
      .catch((error) => console.error(error, 'errFromSingleRestaurant'));
  }

  restaurantProfileCheck = () => {
    const { restaurantId } = this.props.match.params;
    const userId = sessionStorage.getItem('userId');
    userData.getSingleUserRestaurantByUserId(userId, restaurantId)
      .then((response) => {
        if (response.length !== 0) {
          this.setState({ restaurantInProfile: true });
        }
      })
      .catch((error) => console.error(error, 'errFromRestaurantProfileCheck'));
  }

  getSingleRestaurantWithUsers = () => {
    const { restaurantId } = this.props.match.params;
    restaurantData.getSingleRestaurantWithUsers(restaurantId)
      .then((restaurantWithUsers) => this.setState({ buds: restaurantWithUsers.friends }))
      .catch((error) => console.error(error, 'errFromGetSingleRestaurantWithUsers'));
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
    userData.addRestaurantToProfile(userId, newUserRestaurant)
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
    const userId = sessionStorage.getItem('userId');
    userData.deleteUserRestaurant(userId, restaurantId)
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
      buds,
    } = this.state;

    return (
      <div className="SingleRestaurant">
        <div className="container">
          <h1>{restaurant.name}</h1>
          <Card id={restaurant.id} border="dark">
            {
              restaurant.featured_image !== ''
                ? (<Card.Img variant="top" src={restaurant.featured_image} />)
                : (<Card.Img variant="top" src="https://images.unsplash.com/photo-1580906462791-1ccc3195aa34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />)
            }
            <Card.Body>
              <Card.Text>
                <strong>Hours: </strong>
                {
                  restaurant.timings === ''
                    ? (' Unavailable')
                    : restaurant.timings
                }
              </Card.Text>
                <strong>Highlights: </strong>
                {
                  highlights.map((highlight) => <Card.Text>{highlight}</Card.Text>)
                }
              <Card.Text>
                <strong>Phone Number: </strong>{restaurant.phone_numbers}
              </Card.Text>
              <Card.Text>
                <strong>Website: </strong>{restaurant.url}
              </Card.Text>
              <Card.Text>
                <strong>Location: </strong>{location.address}
              </Card.Text>
                <strong>Buds With Same Taste:</strong>
                {
                  buds.length !== 0
                    ? (
                      buds.map((buddy) => <Card.Text>{buddy.firstName} {buddy.lastName}</Card.Text>)
                    )
                    : (' No buds with same taste yet')
                }
              <Card.Footer>
                {
                  restaurantInProfile ? (<button className="btn btn-outline-dark remove" onClick={this.deleteUserRestaurantEvent} >Remove From My Taste</button>) : (<button className="btn btn-outline-dark" onClick={this.addRestaurantEvent} >This is my Taste!</button>)
                }
              </Card.Footer>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default SingleRestaurant;
