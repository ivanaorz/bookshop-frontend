
export default {
    storeLocal(ref: string, item: string) { 
      localStorage.setItem(ref, JSON.stringify(item));
    },
    storeSession(ref: string, item: string) { 
      sessionStorage.setItem(ref, JSON.stringify(item));
    },
    fetchLocal<Type>(ref: string): Type {
      const item = localStorage.getItem(ref) || '{}';
      return JSON.parse(item);
    },
    fetchSession<Type>(ref: string): Type {
      const item = sessionStorage.getItem(ref) || '{}';
      return JSON.parse(item);
    },
    removeLocal(ref: string) {
       localStorage.removeItem(ref);
      }
   
  }
  

