/**This file provides a set of functions to store, retrieve, clear, and decode JWT tokens
   in order to manage effectively authentication and authorization processes, providing a secure 
   and efficient way to identify and verify the user's identity and permissions.*/


import cacheService from "../service/cacheService";
import type { Token } from "../model/tokenDetails";

const JWT_TOKEN_KEY = "JWT_TOKEN";

class JwtService {
  storeJwt(token: string): void {
    cacheService.storeLocal(JWT_TOKEN_KEY, token);
  }
  getJwt(): Token {
    return cacheService.fetchLocal(JWT_TOKEN_KEY);
  }

  clearJwt(): void {
    cacheService.removeLocal();
  }
  
  decodeTokenPayload(token: Token) {
    try {
    const parts = token.accessToken.split(".");
      return JSON.parse(atob(parts[1]));
    } catch (error) {
      return "Handling errors in decode";
    }
     }
   }


export default new JwtService();