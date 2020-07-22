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

const deleteRestaurant = (restaurantId) => axios.delete(`${sqlBaseUrl}/restaurant/remove/${restaurantId}`);

const getSingleRestaurant = (restaurantId) => new Promise((resolve, reject) => {
  axios.get(`${sqlBaseUrl}/restaurant/${restaurantId}`)
    .then((result) => {
      const restaurant = result.data;
      resolve(restaurant);
    })
    .catch((error) => reject(error, 'errFromGetSingleResto'));
});

const getSingleRestaurantWithUsers = (restaurantId) => new Promise((resolve, reject) => {
  axios.get(`${sqlBaseUrl}/restaurant/${restaurantId}/friends`)
    .then((result) => {
      const restaurantWithUsers = result.data;
      resolve(restaurantWithUsers);
    })
    .catch((error) => reject(error, 'errFromGetSingleRestoWithUsers'));
});

export default {
  getRestaurant,
  addRestaurant,
  getAllRestaurants,
  deleteRestaurant,
  getSingleRestaurant,
  getSingleRestaurantWithUsers,
};
