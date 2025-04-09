import React, { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import "./DeathProgressBar.css";
import { FaSeedling } from "react-icons/fa";
import { PiFlowerTulip } from "react-icons/pi";

const DeathProgressBar: React.FC = () => {
  const { user } = useContext(authContext);
  const lifePercentage = user?.lifePercentage ?? 50;

  return (
    <div className="DeathProgressBar">
      <div className="ColorBar">
        <div
          className="StartBar"
          style={{
            width: `${lifePercentage}%`,
          }}
        ></div>
        <div className="Pointer"></div>
        <div className="EndBar"></div>
      </div>
      <div className="TextBar">
        <div className="LifeSection Section">
          <FaSeedling />
          <p>{lifePercentage}%</p>
        </div>
        <div className="DeathSection Section">
          <p>{100 - lifePercentage}%</p>
          <PiFlowerTulip />
        </div>
      </div>
    </div>
  );
};

export default DeathProgressBar;
