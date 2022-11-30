import { memo } from "react";
import { Navigate } from "react-router-dom";
import { useStoreUser } from "../context/AdminContext";
const AdminRoute = ({ children }) => {
  const user = useStoreUser();
  return user?.isAdmin ? children : <Navigate to="/cars" />;
};
export default memo(AdminRoute);
