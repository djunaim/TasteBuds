import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './Profile.scss';
import userData from '../../../helpers/data/userData';

class Profile extends Component {
  state = {
    email: 'modjun12@gmail.com',
    user: [],
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const { email } = this.state;
    userData.getUser(email)
      .then((user) => this.setState({ user }))
      .catch((error) => console.error(error, 'error from getUser'));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="Profile">
        <h1>Welcome {user.firstName}!</h1>
        < div className="d-flex justify-content-center">
        <Card style={{ width: '30rem' }} className="h-100" border="primary">
            <Card.Title>Account Details</Card.Title>
            <Card.Body>
              <Card.Text>
                User Name: {user.firstName} {user.lastName}
              </Card.Text>
              <Card.Text>
                User Email: {user.email}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mb-0">
              <Link to="/profile/savedRestaurants" className="btn btn-primary">My Tastes</Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default Profile;
