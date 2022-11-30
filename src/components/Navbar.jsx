import { UserAuth } from "../context/AuthContext";
import { Buttons, Button, NavbarLayout } from "../styles/components";
import { palette } from "../styles/palette";
import { NavLink, useNavigate } from "react-router-dom";
import { memo } from "react";
import { useStoreUser } from "../context/AdminContext";
const Navbar = (props) => {
  const ctx = UserAuth();
  const storeUser = useStoreUser();
  const goto = useNavigate();
  const handleLogOut = async () => {
    try {
      await ctx.logOut();
      console.log("Logged out");
      goto("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NavbarLayout color={palette.raisinblack}>
      <div className="logo" />
      <ul id="nav-menu">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/cars">
            Cars
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/feedbacks">
            Feedbacks
          </NavLink>
        </li>
      </ul>
      <ul id="user-actions">
        <Buttons className="buttons">
          <li className="nav-item">
            <NavLink hidden={!ctx.user?.uid} className="nav-link" to="/account">
              {ctx.user?.displayName ?? "Account"}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              hidden={!storeUser?.isAdmin}
              className="nav-link"
              to="/admin"
            >
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <Button hidden={!ctx.user?.uid} onClick={handleLogOut}>
              Log&nbsp;out
            </Button>
          </li>
        </Buttons>
        <li className="nav-item" hidden={ctx.user?.uid}>
          <NavLink className="nav-link" to="/signup">
            Sign&nbsp;up
          </NavLink>
        </li>
        <li className="nav-item" hidden={ctx.user?.uid}>
          <NavLink className="nav-link" to="/login">
            Log&nbsp;in
          </NavLink>
        </li>
      </ul>
    </NavbarLayout>
  );
};
export default memo(Navbar);
