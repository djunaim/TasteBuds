import axios from 'axios';

const baseUrl = 'https://localhost:44392/api';

const loginUser = (email) => {
  axios.get(`${baseUrl}/api/users/${email}`).then((userResponse) => {
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
