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
          <Card.Body>
          {
            thumb
              ? (<Card.Img variant="top" src={thumb} />)
              : (<Card.Img variant="top" src="https://raw.githubusercontent.com/djunaim/TasteBuds/master/tastebuds.ui/src/components/shared/Navbar/assets/taste%20%2B%20buds.png" />)
          }
          <Card.Title>{name}</Card.Title>
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
