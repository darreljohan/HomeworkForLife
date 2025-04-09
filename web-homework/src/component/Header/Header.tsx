import { useContext, useState } from "react";
import { User } from "../../models/user";
import "./Header.css";
import { authContext } from "../Provider-Auth/AuthContext";
import Logo from "../../assets/dark-logo.png";
import WindowRegisterField from "../Window-RegisterFieldProper/WindowRegisterField";
import WindowLoginField from "../Window-LoginField/WindowLoginField";
import WindowSetting from "../Window-Setting/WindowSetting";

function Header() {
  const { user, logout, login } = useContext(authContext);
  const [registerWindowState, setRegisterWindowState] =
    useState<boolean>(false);
  const [loginWindowState, setLoginWindowState] = useState<boolean>(false);
  const [settingWindowState, setSettingWindowState] = useState<boolean>(false);
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
                setLoginWindowState(true);
              }}
            >
              Sign in
            </div>
            <div
              className="signup button"
              onClick={() => {
                setRegisterWindowState(true);
              }}
            >
              Sign up
            </div>
          </>
        )}
        {user && (
          <>
            <button
              className="logout button"
              onClick={() => {
                logout();
              }}
            >
              logout
            </button>
            <button
              className="setting button"
              onClick={() => {
                setSettingWindowState(true);
              }}
            >
              Setting
            </button>
          </>
        )}
        {registerWindowState && (
          <WindowRegisterField
            setRegisterWindowState={setRegisterWindowState}
          />
        )}
        {loginWindowState && (
          <WindowLoginField setLoginWindowState={setLoginWindowState} />
        )}
        {settingWindowState && (
          <WindowSetting setSettingWindowState={setSettingWindowState} />
        )}
      </div>
    </div>
  );
}

export default Header;
