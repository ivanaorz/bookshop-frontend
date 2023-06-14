/** This file provides a set of functions responsible for interacting with 
   the server-side API's user-related endpoints. It provides functionality for 
   fetching all users, retrieving user profiles, assigning admin roles to users, and deleting users. */
import tokenAxios from "@/interceptor/tokenAxios";
import type { UserDetails } from "@/model/userDetails";

const BASE_USER_URL = "http://127.0.0.1:8080/";

export default {
    async fetchAll(): Promise<Array<UserDetails>> {
      const resp = await tokenAxios.get(BASE_USER_URL + "/admin/users");
      return resp.data;
    },
  
    async getUserProfile(): Promise<UserDetails> {
      const resp = await tokenAxios.get(BASE_USER_URL + "/library/profile");
      return resp.data;
    },
  
    async assignAdminRole(username: string): Promise<void> {
      const resp = await tokenAxios.put(BASE_USER_URL + `/admin/users${username}`);
    },
  
    async deleteUser(username: string): Promise<void> {
      const resp = await tokenAxios.delete(BASE_USER_URL + `/admin/users${username}`);
    },
  };


  
