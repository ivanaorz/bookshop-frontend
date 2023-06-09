/**This file handles authentication-related operations. It includes functions 
  that  perform such tasks as user registration, login, and logout.
  There must be a  base URL of the authentication API to which are attached 
  specific endpoints depending on the function. */
import type { SigninAuthDetails, SignupAuthDetails } from "../model/authDetails";
import axios from "axios";
import jwtService from "../service/jwtService";
import { useRouter } from 'vue-router';
import type { UserDetails } from "@/model/userDetails";

const BASE_AUTH_URL = 'http://127.0.0.1:3000/auth/';

export default {
    async register(authDetails: SignupAuthDetails): Promise<string> {
      try {const resp = await axios.post(BASE_AUTH_URL + "register", authDetails);
      jwtService.storeJwt(resp.data);
      return resp.data.message} catch {
        return "The account already exists"
      }
      
      
    },
  
    async login(authDetails: SigninAuthDetails): Promise<UserDetails> {
      const resp = await axios.post(BASE_AUTH_URL + "login", authDetails);
      jwtService.storeJwt(resp.data);
      return resp.data;
    },

    async logout() {
        jwtService.clearJwt();
        const router = useRouter();
        await router.push('/login');
      },
  }