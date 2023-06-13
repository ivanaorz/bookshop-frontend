import type { SigninAuthDetails, SignupAuthDetails } from "../model/authDetails";
import axios from "axios";
import jwtService from "../service/jwtService";
import { useRouter } from 'vue-router';
import type { UserDetails } from "@/model/userDetails";

const BASE_AUTH_URL = 'http://127.0.0.1:8080';

export default {
    async register(authDetails: SignupAuthDetails): Promise<UserDetails> {
      const resp = await axios.post(BASE_AUTH_URL + "/register", authDetails);
      jwtService.storeJwt(resp.data);
      return resp.data;
    },
  
    async login(authDetails: SigninAuthDetails): Promise<UserDetails> {
      const resp = await axios.post(BASE_AUTH_URL + "/login", authDetails);
      jwtService.storeJwt(resp.data);
      return resp.data;
    },

    async logout() {
        jwtService.clearJwt();
        const router = useRouter();
        await router.push('/login');
      },
  }