import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Cars from "../pages/Cars";
import Feedbacks from "../pages/Feedbacks";
import Account from "../pages/Account";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import { memo } from "react";
import Protected from "./Protected";
import UpdateProfile from "../components/UpdateProfile";
import AdminRoute from "./AdminRoute";
import Admin from "../pages/Admin";
const Router = () => (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/cars" element={<Cars />} />
    <Route path="/feedbacks" element={<Feedbacks />} />
    <Route
      path="/account"
      element={
        <Protected>
          <Account />
        </Protected>
      }
    />
    <Route
      path="/account/update"
      element={
        <Protected>
          <UpdateProfile />
        </Protected>
      }
    />
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <Admin />
        </AdminRoute>
      }
    />
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/login" element={<Signin />}></Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default memo(Router);
