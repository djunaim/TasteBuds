/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Card className="h-100" border="dark">
          {
            thumb
              ? (<Card.Img variant="top" src={thumb} />)
              : (<Card.Img variant="top" src="https://images.unsplash.com/photo-1580906462791-1ccc3195aa34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />)
          }
          <Card.Title>{name}</Card.Title>
          <Card.Body>
            <Card.Text>
              Average Cost for Two:
              {
                (average_cost_for_two !== 0)
                  ? (Number(average_cost_for_two).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
                  : (' Unavailable')
              }
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {location.address}
            <div className="viewButton">
              <Link to={ `/restaurants/${id}` } className="btn btn-outline-dark">View</Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default RestaurantCard;
