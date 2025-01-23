export const getStoreData = <T>(storeName: string): Promise<T[]> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('myDB2');
  
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const res = store.getAll();
        res.onsuccess = () => {
          resolve(res.result);
        };
      };
    });
  };