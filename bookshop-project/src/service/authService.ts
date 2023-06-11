import type { SigninAuthDetails, SignupAuthDetails } from "../model/authDetails";
import axios from "axios";
import jwtService from "../service/jwtService";
import { useRouter } from 'vue-router';

const BASE_AUTH_URL = 'http://127.0.0.1:8080';

export default {
    async register(authDetails: SignupAuthDetails) {
      const resp = await axios.post(BASE_AUTH_URL + "/register", authDetails);
      jwtService.storeJwt(resp.data);
    },
  
    async login(authDetails: SigninAuthDetails) {
      const resp = await axios.post(BASE_AUTH_URL + "/login", authDetails);
      jwtService.storeJwt(resp.data);
    },

    async logout() {
        jwtService.clearJwt();
        const router = useRouter();
        await router.push('/login');
      },
  }