import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, defaultData: T): [T, (state: T) => void] => {
  const [state, setState] = useState(() => {
    const localData = localStorage.getItem(key);
    return localData ? (JSON.parse(localData) as T) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
