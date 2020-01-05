import axios from 'axios';

const api = axios.create({
  baseURL: `https://5e0f365e9576aa0014666493.mockapi.io`,
});

export default api;
