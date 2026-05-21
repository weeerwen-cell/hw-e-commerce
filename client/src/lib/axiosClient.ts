import axios from "axios";
import { config } from "zod/v4/core";

export const axiosClient = axios.create({
    baseURL: "https://dummyjson.com/",
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});