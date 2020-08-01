import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './FriendCard.scss';

class FriendCard extends Component {
  render() {
    const {
      firstName,
      lastName,
      userId2,
    } = this.props.friend;
    return (
      <div className="FriendCard">
        <div className="d-flex justify-content-center">
          <Card style={{ width: '30rem' }} className="h-100" border="dark" id={userId2}>
            <Card.Body>
              <Card.Text>
                User Name: {firstName} {lastName}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mb-0">
              <Link to={`/profile/${userId2}/savedRestaurants`} className="btn btn-outline-dark">My Tastes</Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default FriendCard;
