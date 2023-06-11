import jwtService from "@/service/jwtService";
import axios, { type InternalAxiosRequestConfig } from "axios";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userRole = jwtService.getUserRole();

  if (userRole === "ADMIN" || userRole === "USER") {
    // Adding the JWT token to the Authorization header if the user has role of "admin" or "user"
    config.headers.Authorization = `Bearer ${jwtService.getJwt()}`;
  }

  return config;
});

export default tokenAxios;