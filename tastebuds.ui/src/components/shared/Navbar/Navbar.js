import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './Navbar.scss';

class NavBar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">TasteBuds</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/findTaste">Tasty Adventure</Link>
              <Link className="nav-link" to="/profile">Profile</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
