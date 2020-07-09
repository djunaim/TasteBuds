import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl, userKey } = apiKeys;

const getCuisines = (cityId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/cuisines?city_id=${cityId}`, {
    headers: {
      'user-key': `${userKey}`,
    },
  })
    .then((result) => {
      const { cuisines } = result.data;
      resolve(cuisines);
    })
    .catch((error) => reject(error, 'errorFromGetCuisines'));
});

export default { getCuisines };
