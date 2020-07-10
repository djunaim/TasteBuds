import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './Navbar.scss';

import authData from '../../../helpers/data/authData';

class NavBar extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    if (sessionStorage.getItem('userId')) {
      this.setState({ authed: true });
    } else {
      this.setState({ authed: false });
    }
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    authData.loginUser('modjun12@gmail.com');
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    authData.logoutUser();
  }

  render() {
    const { authed } = this.state;

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
                authed ? (<Link className="nav-link" to="/profile">Profile</Link>) : ('')
              }
              {
                !authed ? (<Link to="/" className="btn btn-primary" onClick={this.loginClickEvent}>Login</Link>) : (<Link to="/" className="btn btn-danger" onClick={this.logoutClickEvent}>Log Out</Link>)
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
