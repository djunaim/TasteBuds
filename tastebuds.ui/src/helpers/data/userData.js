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

const addRestaurantToProfile = (restaurantObj) => axios.post(`${sqlBaseUrl}/user/restaurantAdd`, restaurantObj);

const deleteUserRestaurant = (restaurantId) => axios.delete(`${sqlBaseUrl}/user/remove/${restaurantId}`);

export default {
  getUser,
  addRestaurantToProfile,
  deleteUserRestaurant,
  getFriends,
};
