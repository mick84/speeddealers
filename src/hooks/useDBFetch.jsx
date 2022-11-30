import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
export default function useDBFetch(collectionName) {
  const [state, setState] = useState({
    data: [],
    error: null,
    loading: false,
  });
  useEffect(() => {
    setState((st) => ({ ...st, loading: true }));
    setTimeout(async () => {
      try {
        const { docs } = await getDocs(collection(db, collectionName));
        const processedData = docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setState((st) => ({ ...st, data: processedData }));
      } catch ({ message }) {
        setState((st) => ({ ...st, error: message }));
      } finally {
        setState((st) => ({ ...st, loading: false }));
      }
    }, 0);
  }, [collectionName]);
  return [state, setState];
}
