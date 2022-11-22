import axios from 'axios';
const AxiosClient = axios.create({
  baseURL: 'https://6376f585b5f0e1eb8515e48d.mockapi.io/',
  responseType: 'json',
  timeout: 50000,
});

export default AxiosClient;
