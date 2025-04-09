import React, { useContext } from "react";
import "./ShortMessage.css";
import logo from "../../assets/logo.png";
import { pageContext } from "../../context/PageContext";

interface ShortMessageProps {
  slideState: React.Dispatch<React.SetStateAction<string>>;
}

const ShortMessage: React.FC<ShortMessageProps> = ({ slideState }) => {
  const { setPage } = useContext(pageContext);

  const handleContinue = () => {
    slideState("RegisterForm");
  };

  return (
    <div className="ShortMessage">
      <div className="Content">
        <button
          className="Exit"
          onClick={() => {
            setPage("Home");
          }}
        >
          X
        </button>
        <div className="Logo">
          <img className="Register-logo" src={logo} />
          <div className="Premise">Count Your Days with Homework of Life!</div>
        </div>
        <div className="Message">
          <p>
            Everyday is a story of your life, don't let your days simply pass
            you by. Capture the essence of this day with just a single sentence
            that will bring you back to this moment.
          </p>
          <p>
            I hope each of your days is always filled with meaning and purpose,
            cheers!
          </p>
        </div>
      </div>
      <button className="Continue-Button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default ShortMessage;
