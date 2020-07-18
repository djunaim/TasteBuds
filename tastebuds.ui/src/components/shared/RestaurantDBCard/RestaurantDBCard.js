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
          {
            thumbNail
              ? (<Card.Img variant="top" src={thumbNail} />)
              : (<Card.Img variant="top" src="https://images.unsplash.com/photo-1580906462791-1ccc3195aa34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />)
          }
          <Card.Title>{name}</Card.Title>
          <Card.Body>
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
          </Card.Footer>
          <Link to={ `/restaurants/${restaurantId}` } className="btn btn-primary">View</Link>
        </Card>
      </div>
    );
  }
}

export default RestaurantCard;
