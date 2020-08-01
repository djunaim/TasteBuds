/* eslint-disable max-len */
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.scss';

import authData from '../../../helpers/data/authData';

class NavBar extends Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  loginClickEvent = () => {
    authData.loginUser('modjun12@gmail.com');
  }

  logoutClickEvent = () => {
    authData.logoutUser();
    sessionStorage.setItem('entityId', 0);
    sessionStorage.setItem('entityType', '');
    sessionStorage.setItem('cuisineId', 0);
  }

  render() {
    const { authed } = this.props;
    const userId = sessionStorage.getItem('userId');

    return (
      <div className="Navbar">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Link className="navbar-brand" to="/">
              <img src="https://raw.githubusercontent.com/djunaim/TasteBuds/master/tastebuds.ui/src/components/shared/Navbar/assets/taste%20%2B%20buds.png" className="logo-image" alt="tastebuds-logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/findTaste">Tasty Adventure</Link>
              {
                authed ? (<Link className="nav-link" to={`/profile/${userId}`}>Profile</Link>) : ('')
              }
              {
                authed ? (<Link className="nav-link" to={`/profile/${userId}/savedRestaurants`}>My Tastes</Link>) : ('')
              }
              {
                !authed ? (<Link to="/" className="btn btn-outline-success" onClick={this.loginClickEvent}>Login</Link>) : (<Link to="/" className="btn btn-outline-dark" onClick={this.logoutClickEvent}>Log Out</Link>)
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
