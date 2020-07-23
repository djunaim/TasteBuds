import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { sqlBaseUrl } = apiKeys;

const getUser = (email) => new Promise((resolve, reject) => {
  axios.get(`${sqlBaseUrl}/user/email/${email}`)
    .then((userResponse) => {
      const user = userResponse.data;
      resolve(user);
    })
    .catch((errFromGetUser) => reject(errFromGetUser));
});

const getFriends = () => new Promise((resolve, reject) => {
  axios.get(`${sqlBaseUrl}/user/friends`)
    .then((response) => {
      const friends = response.data;
      resolve(friends);
    })
    .catch((errFromGetFriends) => reject(errFromGetFriends));
});

const getUserWithRestaurants = (userId) => new Promise((resolve, reject) => {
  axios.get(`${sqlBaseUrl}/user/${userId}/restaurants`)
    .then((response) => {
      const userWithRestaurants = response.data;
      resolve(userWithRestaurants);
    })
    .catch((error) => reject(error, 'errFromUserWithRestos'));
});

const getSingleUserRestaurantByUserId = (userId, restaurantId) => new Promise((resolve, reject) => {
  axios.get(`${sqlBaseUrl}/user/${userId}/userRestaurant/${restaurantId}`)
    .then((response) => {
      const singleUserRestaurantByUserId = response.data;
      resolve(singleUserRestaurantByUserId);
    })
    .catch((error) => reject(error, 'errFromSingleUserRestaurantByUserId'));
});

const addRestaurantToProfile = (userId, restaurantObj) => axios.post(`${sqlBaseUrl}/user/${userId}/restaurantAdd`, restaurantObj);

const deleteUserRestaurant = (userId, restaurantId) => axios.delete(`${sqlBaseUrl}/user/${userId}/remove/${restaurantId}`);

export default {
  getUser,
  addRestaurantToProfile,
  deleteUserRestaurant,
  getFriends,
  getUserWithRestaurants,
  getSingleUserRestaurantByUserId,
};
