/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://company9994-poc.api.identitynow-demo.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const URL = {
  SEARCH: 'search',
};

const baseURL = 'https://company9994-poc.api.identitynow-demo.com/';

export default api;
export { URL, baseURL };
