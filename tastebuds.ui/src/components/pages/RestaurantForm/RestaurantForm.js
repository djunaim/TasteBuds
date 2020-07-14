import React, { Component } from 'react';
import './RestaurantForm.scss';
import locationData from '../../../helpers/data/locationData';
import cuisinesData from '../../../helpers/data/cuisinesData';
import searchData from '../../../helpers/data/searchData';
import RestaurantCard from '../../shared/RestaurantCard/RestaurantCard';
import SearchBox from '../../shared/SearchBox/SearchBox';

class RestaurantForm extends Component {
  state = {
    cityName: '',
    cityId: 0,
    cuisines: [],
    restaurants: [],
    originalRestaurants: [],
    entityId: 0,
    entityType: 0,
    cuisineId: 0,
  }

  componentDidMount() {
    const entityId = sessionStorage.getItem('entityId');
    const entityType = sessionStorage.getItem('entityType');
    const cuisineId = sessionStorage.getItem('cuisineId');
    // const city = sessionStorage.getItem('cityName');
    // this.getAllCuisines(entityId);
    if (entityId, entityType, cuisineId) {
      this.getRestaurantsBasedOnLocationAndCuisine(entityId, entityType, cuisineId);
      // this.setState({ cityName: city, entityType });
    }
  }

  getRestaurantsBasedOnLocationAndCuisine = (entityId, entityType, cuisineId) => {
    // check session storage and if exist, search with those criteria
    searchData.getCuisinesBasedOnLocation(entityId, entityType, cuisineId)
      .then((restaurants) => {
      // within then set session storage
        this.setState({ restaurants, originalRestaurants: restaurants });
        sessionStorage.setItem('entityId', entityId);
        sessionStorage.setItem('entityType', entityType);
        sessionStorage.setItem('cuisineId', cuisineId);
      })
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
      cuisineId,
    } = this.state;
    // if (sessionStorage.getItem('cuisineId')) {
    //   this.setState({ cuisineId });
    // }
    const cuisineIdSelect = e.target.value;
    this.getRestaurantsBasedOnLocationAndCuisine(entityId, entityType, cuisineIdSelect);
  }

  cityChange = (e) => {
    const city = e.target.value;
    locationData.getLocation(city)
      .then((location) => {
        // sessionStorage.setItem('cityName', city);
        this.setState({ cityId: location.city_id, entityId: location.entity_id, entityType: location.entity_type });
        this.getAllCuisines(location.city_id);
      })
      .catch((error) => console.error(error, 'errFromGetLocation'));
    this.setState({ cityName: city });
  }

  clearResultsEvent = (e) => {
    e.preventDefault();
    this.setState({ restaurants: [], cityName: '', cuisines: [] });
    sessionStorage.setItem('entityId', 0);
    sessionStorage.setItem('entityType', '');
    sessionStorage.setItem('cuisineId', 0);
  }

  handleSearchEvent = (e) => {
    const searchField = e.target.value;
    const { originalRestaurants } = this.state;
    if (searchField !== '') {
      this.setState({ restaurants: this.filterProductsByHighlights(originalRestaurants, searchField) });
    } else {
      this.setState({ restaurants: originalRestaurants });
    }
  }

  filterProductsByHighlights(restaurants, term) {
    return restaurants.filter((r) => r.restaurant.highlights.some((highlight) => highlight.toLowerCase().includes(term.toLowerCase())));
  }

  render() {
    const {
      cuisines,
      cityName,
      restaurants,
      cuisineId,
    } = this.state;

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
                  // value={cuisineId}
                  onChange={this.handleFilter}
                  >
                  <option>Choose One</option>
                  {cuisines.map((c) => <option key={c.cuisine.cuisine_id} value={c.cuisine.cuisine_id} >{c.cuisine.cuisine_name}</option>)}
              </select>
            </div>
          </div>
        <button className="btn btn-danger" onClick={this.clearResultsEvent}>Clear Results</button>
        <div className="results">
          <SearchBox
            placeholder='search'
            handleSearchEvent={this.handleSearchEvent}
          />
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
