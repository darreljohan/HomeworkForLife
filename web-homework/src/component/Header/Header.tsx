import { useContext, useState } from "react";
import { User } from "../../models/user";
import "./Header.css";
import { authContext } from "../Provider-Auth/AuthContext";
import Logo from "../../assets/dark-logo.png";
import RegisterFieldWindow from "../Window-RegisterField/RegisterFieldWindow";

function Header() {
  const { user, logout, login } = useContext(authContext);
  const [registerFieldState, setRegisterFieldState] = useState<boolean>(false);

  return (
    <div className="header">
      <div className="logo">
        <img src={Logo}></img>
        <h1 className="logoTitle">Homework for Life</h1>
      </div>
      <div className="navigation">
        {!user && (
          <>
            <div
              className="signin button"
              onClick={() => {
                login();
              }}
            >
              Sign in
            </div>
            <div
              className="signup button"
              onClick={() => {
                setRegisterFieldState(true);
              }}
            >
              Sign up
            </div>
          </>
        )}
        {user && (
          <button
            className="logout button"
            onClick={() => {
              logout();
            }}
          >
            logout
          </button>
        )}
        {registerFieldState && (
          <RegisterFieldWindow setRegisterFieldState={setRegisterFieldState} />
        )}
      </div>
    </div>
  );
}

export default Header;
