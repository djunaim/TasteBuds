/* eslint-disable camelcase */
import React, { Component } from 'react';
import './RestaurantCard.scss';
import Card from 'react-bootstrap/Card';

class RestaurantCard extends Component {
  render() {
    const {
      id,
      name,
      average_cost_for_two,
      thumb,
      location,
    } = this.props.restaurant;
    return (
      <div className="RestaurantCard col-md-4" id={id}>
        <Card style={{ width: '18rem' }} className="h-100" border="primary">
          {
            thumb
              ? (<Card.Img variant="top" src={thumb} />)
              : (<Card.Img variant="top" src="https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />)
          }
          <Card.Title>{name}</Card.Title>
          <Card.Body>
            <Card.Text>
              Average Cost for Two: {Number(average_cost_for_two).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {location.address}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default RestaurantCard;
