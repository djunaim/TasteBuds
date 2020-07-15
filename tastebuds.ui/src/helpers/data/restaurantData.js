import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl, userKey, sqlBaseUrl } = apiKeys;

const getRestaurant = (restaurantId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/restaurant?res_id=${restaurantId}`, {
    headers: {
      'user-key': `${userKey}`,
    },
  })
    .then((result) => {
      const restaurant = result.data;
      resolve(restaurant);
    })
    .catch((error) => reject(error, 'errorFromGetRestaurant'));
});

const getAllRestaurants = () => new Promise((resolve, reject) => {
  axios.get(`${sqlBaseUrl}/restaurants`)
    .then((result) => {
      const allRestaurants = result.data;
      resolve(allRestaurants);
    })
    .catch((error) => reject(error, 'errorFromGetAllRestaurants'));
});

const addRestaurant = (restaurantObj) => axios.post(`${sqlBaseUrl}/restaurant/addRestaurant`, restaurantObj);

export default {
  getRestaurant,
  addRestaurant,
  getAllRestaurants,
};
