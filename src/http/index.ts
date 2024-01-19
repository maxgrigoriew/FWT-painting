import axios from 'axios';

export const API_URL = 'https://test-front.framework.team';
const config = {
  baseURL: API_URL,
};
const http = axios.create(config);
export { http };
