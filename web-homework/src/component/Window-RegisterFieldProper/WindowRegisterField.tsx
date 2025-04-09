import "./WindowRegisterField.css";

import SectionRegisterForm from "../Section-RegisterForm/SectionRegisterForm";
import SectionRegisterShortMessage from "../Section-RegisterShortMessage/SectionRegisterShortMessage";
import BackgroundBlur from "../Background-Blur/BackgroundBlur";

type RegisterFieldProps = {
  setRegisterWindowState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WindowRegisterField({
  setRegisterWindowState,
}: RegisterFieldProps) {
  return (
    <>
      <BackgroundBlur zIndex={999} />
      <div className="windowRegisterField">
        <SectionRegisterShortMessage />
        <SectionRegisterForm setRegisterFieldState={setRegisterWindowState} />
      </div>
    </>
  );
}
