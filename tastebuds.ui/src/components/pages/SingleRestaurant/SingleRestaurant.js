import React, { Component } from 'react';
import './SingleRestaurant.scss';
import Card from 'react-bootstrap/Card';
import restaurantData from '../../../helpers/data/restaurantData';

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
              Location: {location.address}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleRestaurant;
