/**This file handles user registration, login, and logout.*/

import type { SigninAuthDetails, SignupAuthDetails } from "../model/authDetails";
import axios from "axios";
import jwtService from "../service/jwtService";
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import type { UserDetails } from "@/model/userDetails";

const BASE_AUTH_URL = 'http://127.0.0.1:3000/auth/';

export default {
    async register(authDetails: SignupAuthDetails) {
      try {
        const resp = await axios.post(BASE_AUTH_URL + "register", authDetails);
      return resp.data.message
    }  catch (error) {
        return "The account already exists";
      }
    },
  
    async login(authDetails: SigninAuthDetails) {
      try {
      const resp = await axios.post(BASE_AUTH_URL + "login", authDetails);
      jwtService.storeJwt(resp.data.accessToken);
      return "Login successfully";
  } catch (error) {
      return"An error occurred while logging in.";
    }
  },

    async logout() {
        jwtService.clearJwt();
        const router = useRouter();
        await router.push('/login');
      },
  };

  

  