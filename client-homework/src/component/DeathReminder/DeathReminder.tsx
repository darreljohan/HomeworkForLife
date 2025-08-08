/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import "./DeathReminder.css";
import { DateCounter } from "../../utils/dateCounter";
import { authContext } from "../../context/AuthContext";
import { MdWarning } from "react-icons/md";

const DeathReminder: React.FC = () => {
  const { user } = useContext(authContext);
  const [placeholder, setPlaceholder] = useState(false);
  const [userDayLeft] = useState<number>(
    user ? DateCounter(user.birthDate, user.ageExpentancy) : 360
  );

  const handlePlaceholder = () => {
    setPlaceholder(!placeholder);
  };

  return (
    <div className="DeathReminder">
      {user ? (
        userDayLeft > 0 ? (
          <>
            <p className="text-primary">
              Hello {user ? `${user.displayName}` : "Johnny"}, you're
              {` ${userDayLeft} `}
              days closer to your age expentancy
            </p>
            <p className="text-secondary">
              You expect to fulfilled your life before {user.ageExpentancy}{" "}
              years old
            </p>
          </>
        ) : (
          <>
            <p className="text-primary">
              Hello {user ? `${user.displayName}` : "Johnny"}, you have passed
              {` ${userDayLeft * -1} `}
              days from your age expentancy
            </p>
            <p className="text-secondary">
              You have lived throught so much story, congratulation for living
              your life!
            </p>
          </>
        )
      ) : placeholder ? (
        <p className="text-secondary" onClick={() => handlePlaceholder()}>
          You expect to fulfilled your life before 40 years old
        </p>
      ) : (
        <>
          <div
            className="DeathReminder-placeholder"
            onClick={() => handlePlaceholder()}
          >
            <MdWarning className="Warning-logo" />
            <div className="text-secondary">
              <p className="text-secondary-warn">You haven't login</p>
              <p className="text-secondary-nowarn">
                , Click here to see demo placeholder
              </p>
            </div>
          </div>
          <p className="text-secondary">
            First time here? Currently placeholder for first landing user is not
            ready. Please head to register or use placeholder account i have
            gave. Thanks for visting!
          </p>
        </>
      )}
    </div>
  );
};

export default DeathReminder;
