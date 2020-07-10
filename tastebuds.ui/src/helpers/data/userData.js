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

export default { getUser };
