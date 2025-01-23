export const addData = <T extends { key?: string; date?: string }>(storeName: string, data: T): Promise<T|string|null> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('myDB2', 2);
  
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        

        if (data?.key || data?.date) {
          store.put(data);
        } else {
          store.add(data);
        }

        resolve(data);
      };
  
      request.onerror = () => {
        const error = request.error?.message
        if (error) {
          resolve(error);
        } else {
          resolve('Unknown error');
        }
      };
    });
  };