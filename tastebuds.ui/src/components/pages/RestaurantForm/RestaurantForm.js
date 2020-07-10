import React, { Component } from 'react';
import './RestaurantForm.scss';
import { Link } from 'react-router-dom';
import locationData from '../../../helpers/data/locationData';
import cuisinesData from '../../../helpers/data/cuisinesData';

class RestaurantForm extends Component {
  state = {
    cityName: '',
    cityId: 0,
    cuisines: [],
  }

  componentDidMount() {

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
    const cuisineId = e.target.value;
  }

  cityChange = (e) => {
    // e.preventDefault();
    const city = e.target.value;
    locationData.getLocation(city)
      .then((location) => {
        this.setState({ cityId: location.city_id });
        this.getAllCuisines(location.city_id);
      })
      .catch((error) => console.error(error, 'errFromGetLocation'));
    this.setState({ cityName: city });
  }

  render() {
    const { cuisines, cityName } = this.state;

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
        </div>
        <Link to="/restaurants" className="btn btn-secondary">Restaurants</Link>
      </div>
    );
  }
}

export default RestaurantForm;
