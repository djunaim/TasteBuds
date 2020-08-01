/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantDBCard.scss';
import Card from 'react-bootstrap/Card';

class RestaurantCard extends Component {
  render() {
    const {
      restaurantId,
      address,
      averageCostForTwo,
      thumbNail,
      name,
    } = this.props.restaurant;
    return (
      <div className="RestaurantDBCard col-md-4" id={restaurantId}>
        <Card className="h-100" border="dark">
          <Card.Body>
          {
            thumbNail
              ? (<Card.Img variant="top" src={thumbNail} />)
              : (<Card.Img variant="top" src="https://raw.githubusercontent.com/djunaim/TasteBuds/master/tastebuds.ui/src/components/shared/RestaurantCard/assets/taste%20buds.png" />)
          }
          <Card.Title>{name}</Card.Title>
            <Card.Text>
              Average Cost for Two:
              {
                (averageCostForTwo !== 0)
                  ? (Number(averageCostForTwo).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
                  : (' Unavailable')
              }
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {address}
            <div className="viewButton">
              <Link to={ `/restaurants/${restaurantId}` } className="btn btn-outline-dark">View</Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default RestaurantCard;
