/* eslint-disable max-len */
import React, { Component } from 'react';
import './Home.scss';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import HorizontalScroll from 'react-scroll-horizontal';
import restaurantData from '../../../helpers/data/restaurantData';
import RestaurantDBCard from '../../shared/RestaurantDBCard/RestaurantDBCard';

class Home extends Component {
  state = {
    restaurants: [],
  }

  componentDidMount() {
    this.getRestaurantRecs();
  }

  getRestaurantRecs = () => {
    restaurantData.getRestaurantRecs()
      .then((restaurants) => this.setState({ restaurants }))
      .catch((error) => console.error(error, 'errFromResRecs'));
  }

  render() {
    const { restaurants } = this.state;
    const parent = { width: '100vw', height: '55vh' };

    return (
      <div className="Home">
        <div className="carousel">
          <Carousel>
            <Carousel.Item>
              <img
                className="center-block w-100"
                src="https://images.unsplash.com/photo-1513267048331-5611cad62e41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                alt="pourover"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="center-block w-100"
                src="https://images.unsplash.com/photo-1564486054184-1c26aa52b1c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                alt="front-restaurant-pic"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="center-block w-100"
                src="https://images.unsplash.com/photo-1579697096985-41fe1430e5df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
                alt="bread"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="parallax"></div>
        <div className="about transbox">
          <p>Taste Buds came from an idea that everyone eats, but not everyone knows where to go. It's an app for foodies created by foodies. So, you know you'll be hooked up to some amazing spots if you stick with us. Whether you're alone or with friends, let Taste Buds lead you the way to some tasty adventures. After all, the stomach wants what it wants. If you're ready to start, then let's</p>
          <Link to="/findTaste" className="btn btn-outline-secondary">Go On A Tasty Adventure!</Link>
        </div>
        <div className="parallax"></div>
          <div className="restaurantsContainer">
            <h4>Taste Tests</h4>
            <HorizontalScroll style={parent}>
              {
                restaurants.map((restaurant) => <RestaurantDBCard key={restaurant.restaurantId} restaurant={restaurant} />)
              }
            </HorizontalScroll>
          </div>
        <div className="parallax"></div>
      </div>
    );
  }
}

export default Home;
