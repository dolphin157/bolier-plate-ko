import axios from 'axios';
import { LOGIN_USER } from '../_actions/types';
import { REGISTER_USER } from '../_actions/types';
import { AUTH_USER } from '../_actions/types';

export function loginUser(dataToSubmit) {
  const request = axios.post('/api/users/login', dataToSubmit).then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err.response.data);
      throw err;
    });

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function auth() {
  const request = axios
    .get('/api/users/auth')
    .then((res) => res.data)
    .catch((err) => {
      console.error(err.response.data);
      throw err;
    });

  return {
    type: AUTH_USER,
    payload: request
  };
}
