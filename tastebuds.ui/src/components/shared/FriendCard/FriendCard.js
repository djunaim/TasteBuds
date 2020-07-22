import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './FriendCard.scss';

class FriendCard extends Component {
  render() {
    const { firstName, lastName } = this.props.friend;
    return (
      <div className="FriendCard col-md-4">
        <div className="d-flex justify-content-center">
          <Card style={{ width: '30rem' }} className="h-100" border="primary">
              <Card.Title>Account Details</Card.Title>
              <Card.Body>
                <Card.Text>
                  User Name: {firstName} {lastName}
                </Card.Text>
              </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default FriendCard;
