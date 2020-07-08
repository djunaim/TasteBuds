import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl, userKey } = apiKeys;

const getLocation = (city) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/locations?query=${city}`, {
    headers: {
      'user-key': `${userKey}`,
    },
  })
    .then((result) => console.log('from get locations', result.data.location_suggestions[0]))
    .catch((error) => reject(error, 'errorFromGetLocation'));
});

export default { getLocation };
