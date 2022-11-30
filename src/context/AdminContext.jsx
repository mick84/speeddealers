import { createContext, memo, useState, useEffect, useContext } from "react";
import { UserAuth } from "./AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
export const AdminCont = createContext();
const StoreContextProvider = ({ children }) => {
  const { user } = UserAuth();
  const [state, setState] = useState(null);
  useEffect(() => {
    const docref = user?.uid ? doc(db, "users", user.uid) : null;
    if (!docref) {
      setState(() => null);
      return;
    }
    setTimeout(async () => {
      try {
        const storeUser = await getDoc(docref);
        setState(() => ({ id: storeUser.id, ...storeUser.data() }));
      } catch (error) {
        console.log(error);
      }
    }, 0);
  }, [user]);
  return <AdminCont.Provider value={state}>{children}</AdminCont.Provider>;
};
export default memo(StoreContextProvider);
export const useStoreUser = () => useContext(AdminCont);
