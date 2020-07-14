import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl, userKey } = apiKeys;

const getCuisinesBasedOnLocation = (entityId, entityType, cuisineId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/search?entity_id=${entityId}&entity_type=${entityType}&cuisines=${cuisineId}`, {
    headers: {
      'user-key': `${userKey}`,
    },
  })
    .then((result) => {
      const { restaurants } = result.data;
      resolve(restaurants);
    })
    .catch((error) => reject(error, 'errFromGetCuisinesBasedOnLocation'));
});

export default { getCuisinesBasedOnLocation };
