import "./SectionOauth.css";
import { FcGoogle } from "react-icons/fc";

export default function SectionOauth() {
  return (
    <div className="sectionOauth">
      <div className="sectionOauthButton">
        <button className="googleButton">
          <FcGoogle className="googleIcon" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
