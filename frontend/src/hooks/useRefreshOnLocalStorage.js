// src/hooks/useRefreshOnLocalStorage.js
import { useEffect } from "react";

export const useRefreshOnLocalStorage = (key, callback) => {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage && event.key === key) {
        callback();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, callback]);
};
