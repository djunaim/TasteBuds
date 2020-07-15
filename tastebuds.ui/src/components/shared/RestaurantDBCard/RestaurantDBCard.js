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
      hours,
      name,
      url,
    } = this.props.restaurant;
    return (
      <div className="RestaurantCard col-md-4" id={restaurantId}>
        <Card style={{ width: '18rem' }} className="h-100" border="primary">
          {
            thumbNail
              ? (<Card.Img variant="top" src={thumbNail} />)
              : (<Card.Img variant="top" src="https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />)
          }
          <Card.Title>{name}</Card.Title>
          <Card.Body>
            <Card.Text>
              Average Cost for Two: {Number(averageCostForTwo).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
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
