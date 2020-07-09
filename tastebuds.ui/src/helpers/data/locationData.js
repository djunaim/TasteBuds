import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl, userKey } = apiKeys;

const getLocation = (city) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/locations?query=${city}`, {
    headers: {
      'user-key': `${userKey}`,
    },
  })
    .then((result) => {
      const locations = result.data.location_suggestions[0];
      resolve(locations);
    })
    .catch((error) => reject(error, 'errorFromGetLocation'));
});

export default { getLocation };
