import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase";
export const UserContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const updateUser = (displayName, photoURL) => {
    return updateProfile(user, { displayName, photoURL });
  };
  const updateUserEmail = (email) => {
    return updateEmail(user, email);
  };
  const updateUserPassword = (password) => {
    return updatePassword(user, password);
  };
  const ProviderValues = {
    createUser,
    logIn,
    logOut,
    updateUser,
    updateUserEmail,
    updateUserPassword,
    deleteUser,
    user,
  };
  return (
    <UserContext.Provider value={ProviderValues}>
      {children}
    </UserContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(UserContext);
};
