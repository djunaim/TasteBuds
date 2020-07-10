import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { sqlBaseUrl } = apiKeys;

const loginUser = (email) => {
  axios.get(`${sqlBaseUrl}/user/email/${email}`)
    .then((userResponse) => {
      console.log('user response', userResponse.data);
      sessionStorage.setItem('userId', userResponse.data.userId);
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
