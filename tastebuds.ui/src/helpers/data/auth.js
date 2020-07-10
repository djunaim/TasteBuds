import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { sqlBaseUrl } = apiKeys;

const loginUser = (email) => {
  axios.get(`${sqlBaseUrl}/api/users/${email}`).then((userResponse) => {
    sessionStorage.setItem('userId', userResponse.id);
  });
};

const logoutUser = () => {
  sessionStorage.removeItem('userId');
};

const getUserId = () => sessionStorage.getItem('userId');

export default {
  getUserId,
  loginUser,
  logoutUser,
};
