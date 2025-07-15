import axios from 'axios';

const ApiService = axios.create({
  baseURL: 'https://dummyjson.com',
});

export default ApiService;
