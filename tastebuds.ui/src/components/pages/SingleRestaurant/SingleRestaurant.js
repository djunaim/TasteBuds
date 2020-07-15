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
  }

  componentDidMount() {
    const { restaurantId } = this.props.match.params;
    restaurantData.getRestaurant(restaurantId)
      .then((restaurant) => this.setState({ restaurant, location: restaurant.location, highlights: restaurant.highlights }))
      .catch((error) => console.error(error, 'errFromSingleRestaurant'));
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

  render() {
    const { restaurant, highlights, location } = this.state;

    return (
      <div className="SingleRestaurant">
        <h1>{restaurant.name}</h1>
        <Card>
          <Card.Img variant="top" src={restaurant.featured_image}/>
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
              Location: {location.address}, {location.city} {location.zipcode}
            </Card.Text>
            <Card.Footer>
              <button className="btn btn-secondary" onClick={this.addRestaurantEvent} >Save to Profile</button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleRestaurant;
