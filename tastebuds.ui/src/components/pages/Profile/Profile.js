import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './Profile.scss';
import userData from '../../../helpers/data/userData';
import FriendCard from '../../shared/FriendCard/FriendCard';
import restaurantData from '../../../helpers/data/restaurantData';
import RestaurantDBCard from '../../shared/RestaurantDBCard/RestaurantDBCard';

class Profile extends Component {
  state = {
    email: 'modjun12@gmail.com',
    user: [],
    friends: [],
    restaurants: [],
  }

  componentDidMount() {
    this.getUser();
    this.getFriends();
    this.getRestaurantRecs();
  }

  getUser = () => {
    const { email } = this.state;
    userData.getUser(email)
      .then((user) => this.setState({ user }))
      .catch((error) => console.error(error, 'error from getUser'));
  }

  getFriends = () => {
    userData.getFriends()
      .then((friends) => this.setState({ friends }))
      .catch((error) => console.error(error, 'errFromGetFriends'));
  }

  getRestaurantRecs = () => {
    restaurantData.getRestaurantRecs()
      .then((restaurants) => this.setState({ restaurants }))
      .catch((error) => console.error(error, 'errFromResRecs'));
  }

  render() {
    const {
      user,
      friends,
      restaurants,
    } = this.state;
    const userId = sessionStorage.getItem('userId');

    return (
      <div className="Profile">
        <h1>Welcome {user.firstName}!</h1>
        <div className="profileContainer container">
          <div className="myAccount">
            <h4>My Account</h4>
            <Card style={{ width: '30rem' }} border="primary">
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
                <Link to={`/profile/${userId}/savedRestaurants`} className="btn btn-outline-dark">My Tastes</Link>
              </Card.Footer>
            </Card>
          </div>
          <div className="friends">
            <h4>My Buds</h4>
              {
                friends.map((friend) => <FriendCard key={friend.friendshipId} friend={friend} />)
              }
          </div>
        </div>
        <div className="restaurants container">
          <h4>Recommended Taste Tests Based on Your Buds</h4>
          <div className="row">
            {
              restaurants.map((restaurant) => <RestaurantDBCard key={restaurant.restaurantId} restaurant={restaurant} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
