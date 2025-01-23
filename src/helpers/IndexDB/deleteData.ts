export const deleteData = (storeName: string, key: string | number): Promise<boolean> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('myDB2', 2);
  
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const res = store.delete(key);
  
        res.onsuccess = () => {
          resolve(true);
        };
        res.onerror = () => {
          resolve(false);
        }
      };
    });
  };