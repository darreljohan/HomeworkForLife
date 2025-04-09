import React, { useContext, useState } from "react";
import "./DeathReminder.css";
import { DateCounter } from "../../utils/dateCounter";
import { authContext } from "../../context/AuthContext";
import { MdWarning } from "react-icons/md";

const DeathReminder: React.FC = () => {
  const { user } = useContext(authContext);
  const [placeholder, setPlaceholder] = useState(false);

  const handlePlaceholder = () => {
    setPlaceholder(!placeholder);
  };

  return (
    <div className="DeathReminder">
      <p className="text-primary">
        Be aware {user ? `${user.displayName}` : "Johnny"}, you're
        {user
          ? ` ${DateCounter(user.birthDate, user.ageExpentancy)} `
          : " 360 "}
        days closer to death
      </p>
      {user ? (
        <p className="text-secondary">
          You expect to fulfilled your life before {user.ageExpentancy} years
          old
        </p>
      ) : placeholder ? (
        <p className="text-secondary" onClick={() => handlePlaceholder()}>
          You expect to fulfilled your life before 40 years old
        </p>
      ) : (
        <div
          className="DeathReminder-placeholder"
          onClick={() => handlePlaceholder()}
        >
          <MdWarning />
          <p className="text-secondary">
            You haven't login, Click here to see demo placeholder
          </p>
        </div>
      )}
    </div>
  );
};

export default DeathReminder;
