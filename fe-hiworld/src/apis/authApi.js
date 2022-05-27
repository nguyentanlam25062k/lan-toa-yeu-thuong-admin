import axios from '../utils/axios';
import { axiosJWT } from '../utils/axios';

export const login = (data) => {
  return axiosJWT({
    method: 'POST',
    url: '/authentication/login',
    data,
  });
};
export const register = (data) => {
  return axios({
    method: 'POST',
    url: '/authentication/sign-up',
    data,
  });
};
export const logout = () => {
  return axios({
    method: 'POST',
    url: '/authentication/logout',
  });
};
