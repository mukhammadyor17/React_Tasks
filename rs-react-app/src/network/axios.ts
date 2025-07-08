import axios from 'axios';

const ApiService = axios.create({
  baseURL: 'https://api.example.com',
});

export default ApiService;
