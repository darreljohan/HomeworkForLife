import "./Register.css";
import { useState } from "react";
import ShortMessage from "../../component/ShortMessage/ShortMessage";
import RegisterForm from "../../component/RegisterForm/RegisterForm";

const Register: React.FC = () => {
  const [slide, setSlide] = useState<string>("ShortMessage");

  const renderSlide = () => {
    switch (slide) {
      case "ShortMessage":
        return <ShortMessage slideState={setSlide} />;
      case "RegisterForm":
        return <RegisterForm slideState={setSlide} />;
      default:
        return <ShortMessage slideState={setSlide} />;
    }
  };

  return <div className="Register">{renderSlide()}</div>;
};

export default Register;
