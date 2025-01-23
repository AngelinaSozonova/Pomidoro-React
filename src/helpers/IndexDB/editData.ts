import { ITask } from "src/components/SectionMain/types";

export const editData = <T extends ITask>(
    storeName: string,
    data: T
  ): Promise<T | string | null> => {
    return new Promise((resolve) => {
      const request = indexedDB.open("myDB2", 2);
  
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
  
        if (data.key) {
          store.put(data);
          resolve(data);
        } else {
          resolve("Объект не содержит ключа");
        }
      };
  
      request.onerror = () => {
        const error = request.error?.message;
        if (error) {
          resolve(error);
        } else {
          resolve("Неизвестная ошибка");
        }
      };
    });
  };
