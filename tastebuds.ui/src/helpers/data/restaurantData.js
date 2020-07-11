import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl, userKey } = apiKeys;

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

export default { getRestaurant };
