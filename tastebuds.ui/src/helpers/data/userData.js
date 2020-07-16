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

const addRestaurantToProfile = (restaurantObj) => axios.post(`${sqlBaseUrl}/user/restaurantAdd`, restaurantObj);

const deleteUserRestaurant = (restaurantId) => axios.delete(`${sqlBaseUrl}/user/remove/${restaurantId}`);

export default {
  getUser,
  addRestaurantToProfile,
  deleteUserRestaurant,
};
