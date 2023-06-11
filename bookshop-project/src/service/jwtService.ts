import cacheService from "../service/cacheService";

const JWT_TOKEN_KEY = "JWT_TOKEN";

interface TokenPayload {
  role: string;
}
export default {
    storeJwt(token: string): void {
      cacheService.storeLocal(JWT_TOKEN_KEY, token);
    },
    getJwt(): string | null {
      return cacheService.fetchLocal(JWT_TOKEN_KEY);
    },
    clearJwt(): void {
      cacheService.removeLocal(JWT_TOKEN_KEY);
    },
    getUserRole(): string | null {
      const token = this.getJwt();
      if (!token) return null;
  
      const payload = this.decodeTokenPayload(token);
      return payload.role || null;
    },
      decodeTokenPayload(token: string): TokenPayload {
        const parts = token.split(".");
        const encodedPayload = parts[1];
        const decodedPayload = atob(encodedPayload);
        return JSON.parse(decodedPayload) as TokenPayload;
      }
    }