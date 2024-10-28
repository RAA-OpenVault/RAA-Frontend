import axios from "axios";

export const fetcher = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const baseFetcher = axios.create({
  baseURL: process.env.API_BASE_URL,
});

fetcher.interceptors.request.use((config) => {
  // get token from localStorage
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
