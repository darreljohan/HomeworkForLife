import React, { useContext } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { authContext } from "../../context/AuthContext";
import {
  MdLogout,
  MdOutlineManageAccounts,
  MdOutlineLogin,
} from "react-icons/md";
import { pageContext } from "../../context/PageContext";

const Navbar: React.FC = () => {
  const { user, logout } = useContext(authContext);
  const { setPage } = useContext(pageContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className="asset-logo" src={logo} />
        <h1>Homework For Life</h1>
      </div>
      <ul className="navbar-menu">
        {user ? (
          <>
            <li
              className="navbar-item clickable"
              onClick={() => setPage("Setting")}
            >
              <MdOutlineManageAccounts className="icon" />
              <p>Setting</p>
            </li>
            <li className="navbar-item clickable" onClick={() => logout()}>
              <MdLogout className="icon" />
              <p>Logout</p>
            </li>
          </>
        ) : (
          <>
            <li
              className="navbar-item clickable"
              onClick={() => setPage("Login")}
            >
              <MdOutlineLogin className="icon" />
              <p>Login</p>
            </li>
            <li
              className="navbar-item clickable"
              onClick={() => setPage("Register")}
            >
              <MdOutlineLogin className="icon" />
              <p>Register</p>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
