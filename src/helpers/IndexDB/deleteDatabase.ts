export const deleteDatabase = async (nameBase: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(nameBase);

    request.onerror = (event) => {
      if (event.target instanceof IDBRequest) {
        reject(event.target.error);
      }
    };

    request.onsuccess = () => {
      console.log(`База данных ${nameBase} успешно удалена`);
      resolve();
    };
  });
};
