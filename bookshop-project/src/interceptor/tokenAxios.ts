/** This file handles authentication and authorization for API requests by automatically 
   adding the JWT token to the headers based on the user's role. By attaching this interceptor
   to the Axios instance, all subsequent requests made using tokenAxios instance will automatically 
   include the JWT token in the Authorization header, ensuring that the server can verify and 
   authorize the user based on their role.*/

import jwtService from "@/service/jwtService";
import axios, { type InternalAxiosRequestConfig } from "axios";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // const userRole = jwtService.getUserRole();

  // if (userRole === "ADMIN" || userRole === "USER") {
    
    config.headers.Authorization = `Bearer ${jwtService.getJwt()}`;
  // }

  return config;
});

export default tokenAxios;