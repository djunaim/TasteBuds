import React, { Component } from 'react';
import './RestaurantForm.scss';
import locationData from '../../../helpers/data/locationData';
import cuisinesData from '../../../helpers/data/cuisinesData';
import searchData from '../../../helpers/data/searchData';
import RestaurantCard from '../../shared/RestaurantCard/RestaurantCard';

class RestaurantForm extends Component {
  state = {
    cityName: '',
    cityId: 0,
    cuisines: [],
    emptyRestaurants: [],
    restaurants: [],
    entityId: 0,
    entityType: 0,
  }

  getRestaurantsBasedOnLocationAndCuisine = (entityId, entityType, cuisineId) => {
    searchData.getCuisinesBasedOnLocation(entityId, entityType, cuisineId)
      .then((restaurants) => this.setState({ restaurants }))
      .catch((error) => console.error(error, 'errFromGetRestaurantsBasedOnLocationAndCuisine'));
  }

  getAllCuisines = (cityId) => {
    cuisinesData.getCuisines(cityId)
      .then((cuisines) => {
        this.setState({ cuisines });
      })
      .catch((error) => console.error(error, 'errFromGetAllCuisines'));
  }

  handleFilter = (e) => {
    e.preventDefault();
    const {
      entityId,
      entityType,
      cityName,
      emptyRestaurants,
    } = this.state;
    const cuisineId = e.target.value;
    if (cityName !== '') {
      this.getRestaurantsBasedOnLocationAndCuisine(entityId, entityType, cuisineId);
    } else {
      this.setState({ restaurants: emptyRestaurants });
    }
  }

  cityChange = (e) => {
    // e.preventDefault();
    const city = e.target.value;
    locationData.getLocation(city)
      .then((location) => {
        this.setState({ cityId: location.city_id, entityId: location.entity_id, entityType: location.entity_type });
        this.getAllCuisines(location.city_id);
      })
      .catch((error) => console.error(error, 'errFromGetLocation'));
    this.setState({ cityName: city });
  }

  clearResultsEvent = (e) => {
    const { emptyRestaurants } = this.state;
    e.preventDefault();
    this.setState({ restaurants: emptyRestaurants, cityName: '', cuisines: [] });
  }

  render() {
    const { cuisines, cityName, restaurants } = this.state;

    return (
      <div className="RestaurantForm">
        <h1>Restaurant Form</h1>
        <div className="container">
          <div className="form-group">
            <label htmlFor="city-query"><strong>City</strong></label>
            <input
              input="text"
              className="form-control"
              id="city-query"
              placeholder="Search City"
              value={cityName}
              onChange={this.cityChange}
            />
          </div>
          <div className="dropdownSection">
            <div className="form-group">
              <label htmlFor="cuisine-name" className="col-form-label categoryDropdown"><strong>Filter By Cuisines</strong></label>
                <select
                  type="select"
                  className="form-control"
                  id="cuisine-name"
                  onChange={this.handleFilter}
                  >
                  <option>Choose One</option>
                  {cuisines.map((c) => <option key={c.cuisine.cuisine_id} value={c.cuisine.cuisine_id} >{c.cuisine.cuisine_name}</option>)}
              </select>
            </div>
          </div>
        <button className="btn btn-danger" onClick={this.clearResultsEvent}>Clear Results</button>
        <div className="results">
          <div className="row">
            {
              restaurants.map((r) => <RestaurantCard key={r.restaurant.id} restaurant={r.restaurant} />)
            }
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default RestaurantForm;
