/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: 'identityiq',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
