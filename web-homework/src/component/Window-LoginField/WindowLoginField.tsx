import BackgroundBlur from "../Background-Blur/BackgroundBlur";
import SectionDefaultLoginForm from "../Section-DefaultLoginForm/SectionDefaultLoginForm";
import SectionOauth from "../Section-Oauth/SectionOauth";
import "./WindowLoginField.css";

type LoginWindowProps = {
  setLoginWindowState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WindowLoginField({
  setLoginWindowState,
}: LoginWindowProps) {
  return (
    <>
      <BackgroundBlur zIndex={1009} />
      <div className="windowLoginField">
        <div
          className="exitWindowLoginField"
          onClick={() => setLoginWindowState(false)}
        >
          X
        </div>
        <div className="loginPremise">Sign In to Your Journal!</div>
        <div className="loginSubPremise">
          {" "}
          Don’t let the day end without jotting something down.
        </div>
        <div className="loginForm">
          <SectionDefaultLoginForm setLoginWindowState={setLoginWindowState} />
          <div className="borderAlternative">Or Login with</div>
          <SectionOauth />
        </div>
        <div className="loginFooter"></div>
      </div>
    </>
  );
}
