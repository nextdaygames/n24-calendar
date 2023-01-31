import axios from 'axios';

const live = "https://nextdaygames-storefront.herokuapp.com"
const local = "https://127.0.0.1:5000"

var RestApi = axios.create({
    baseURL: local,
    timeout: 1000,
    withCredentials: true
});
  
RestApi.interceptors.request.use(
    function(config) {
      config.headers.withCredentials = true;
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
);

export default RestApi