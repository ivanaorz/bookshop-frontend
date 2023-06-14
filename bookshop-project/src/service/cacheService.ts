/**This  file is responsible for providing a set of functions that 
  handle caching data in the browser's local storage and session storage. 
  It is used to store and retrieve data in key-value pairs 
  (to each item of data is attributed a unique key value). In case of storing, the data is
  converted into a JSON string. In case of retrieving, the data is converted from JSON string into
  JavaScript object again. In the localStorages, the data remains even after clowsing the browser.
  In the sessionStorage, the data persists as long as the browser is open. When it gets closed the data
  is automatically cleared. */
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
  

