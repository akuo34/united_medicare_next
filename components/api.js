import Axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

let urls = {
  development: 'http://localhost:3434',
  production: 'http://52.8.24.75:3434'
}

const api = Axios.create({
  baseURL: urls[publicRuntimeConfig.nodeEnv],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;