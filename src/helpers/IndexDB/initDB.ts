export const initDB = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const request = indexedDB.open("myDB2", 2);
  
      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "key" });
        }

        if (!db.objectStoreNames.contains("statistics")) {
          db.createObjectStore("statistics", { keyPath: "date" });
        }
      };
  
      request.onsuccess = () => {
        resolve(true);
      };
  
      request.onerror = () => {
        resolve(false);
      };
    });
  };