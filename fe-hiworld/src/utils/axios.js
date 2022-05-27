import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
axiosInstance.defaults.timeout = 60000;
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

axiosInstance.interceptors.response.use(
  (response) => {
    // if (response.data.code !== 0) throw new Error(response.data.msg);
    return response.data;
  },
  (e) => {
    console.log(e);
    return Promise.reject(new Error(e.response.data.msg || 'Đã xảy ra sự cố'));
  }
);

const axiosJWT = axiosInstance.create();
axiosJWT.defaults.withCredentials = true;
axiosJWT.interceptors.response.use(
  (response) => {
    // if (response.data.code !== 0) throw new Error(response.data.msg);
    return response.data;
  },
  (e) => {
    console.log(e);
    return Promise.reject(new Error(e.message));
  }
);
// axiosJWT.interceptors.request.use(async (config) => {

//     const accessToken = store.getState().auth.accessToken
//     config
//         .headers = {
//         'Authorization': `Bearer ${accessToken}`
//     }
//     const now = new Date()
//     const expiresTime = jwt_decode(accessToken)
//     if (expiresTime.exp * 1000 < now.getTime()) {
//         try {
//             if (store.getState().auth.user.provider === "system"
//                 && store.getState().auth.isLoggedIn === 1
//             ) {
//                 const result = await axios({
//                     method: 'POST',
//                     url: '/auth/refreshToken',
//                     withCredentials: true
//                 })
//                 config.headers = {
//                     'Authorization': `Bearer ${result.data}`
//                 }
//                 store.dispatch(addToken(result.data))
//             }
//         } catch (err) {
//             (async () => {
//                 if (err.response?.status !== 500) {
//                     await store.dispatch(logout())
//                     toast.warn("Your session has expired!", {
//                         position: toast.POSITION.TOP_CENTER
//                     })
//                     store.dispatch(cartRemove())
//                     store.dispatch(favoritesRemove())
//                     store.dispatch(loginUpdate(0))
//                 } else {
//                     console.log(err.response)
//                 }
//             })()
//         }
//     }
//     return config
// }, (err) => {
//     return Promise.reject(err)
// })
export { axiosJWT };
export default axiosInstance;
