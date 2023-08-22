/**This  file is responsible for providing a set of functions that 
  handle caching data in the browser's local storage and session storage. 
  It is used to store and retrieve data in key-value pairs 
  (to each item of data is attributed a unique key value). In case of storing, the data is
  converted into a JSON string. In case of retrieving, the data is converted from JSON string into
  JavaScript object again. In the localStorages, the data remains even after clowsing the browser.
  In the sessionStorage, the data persists as long as the browser is open. When it gets closed the data
  is automatically cleared. */
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
  

