/**This  file is responsible for providing a set of functions that 
  handle caching data in the browser's local storage and session storage.  */

export default {
  // to store data on the user's device, within their browser's storage system.
    storeLocal(ref: string, item: string): void { 
      localStorage.setItem(ref, JSON.stringify(item));
    },

    // to store data in the session storage, which is only available for the duration of the current browser session.
    storeSession(ref: string, item: string) { 
      sessionStorage.setItem(ref, JSON.stringify(item));
    },
    
    fetchLocal<Type>(ref: string): Type {
      const data = localStorage.getItem(ref) || '{}';
      return JSON.parse(data);
    },
    fetchSession<Type>(ref: string): Type {
      const item = sessionStorage.getItem(ref) || '{}';
      return JSON.parse(item);
    },
    removeLocal() {
       localStorage.clear();
      }
   
  }
  

