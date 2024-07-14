import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const getApiUrl = (endpoint: string) => `${API_BASE_URL}/${API_VERSION}/${endpoint}`;

export const api = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
