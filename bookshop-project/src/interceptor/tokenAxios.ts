/** This file configures an Axios instance (tokenAxios) with an interceptor 
  to automatically include a JWT Token from jwtService in the
  Authorization header of outgoing HTTP requests.*/

import jwtService from "@/service/jwtService";
import axios, { type InternalAxiosRequestConfig } from "axios";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization =
    "Bearer " + jwtService.getJwt();
    console.log(config);
  return config;
});

export default tokenAxios;