import { useState, useContext, useEffect } from "react";
import "./DeathProgressBar.css";
import { authContext } from "../Provider-Auth/AuthContext";
import { User } from "../../models/user";
import calcRatioDeath from "../../businessLogic/calcRatioDeath";
import heartBeat from "../../assets/heartbeat.png";
import tomb from "../../assets/tomb.png";

function DeathProgressBar() {
  const { user } = useContext(authContext);
  const [startBarValue, setStartBarValue] = useState<number>(0);

  useEffect(() => {
    const barWidth = calcRatioDeath(
      user?.birthDate as Date,
      user?.expectedDeathDate as Date
    );
    setStartBarValue(barWidth);
    console.log(`Here user birthday ${user?.birthDate}`);
  }, []);

  return (
    <div className="deathProgressBar">
      <div
        className="startBar"
        style={{ flexBasis: `${startBarValue ? startBarValue : 0}%` }}
      >
        <img src={heartBeat} className="heartbeat-logo" />
        <p className="lifePercent">{startBarValue + `%`}</p>
      </div>
      <div className="pointer"></div>
      <div className="endBar">
        <img src={tomb} className="tomb-logo" />
        <p className="lifePercent">{100 - startBarValue + `%`}</p>
      </div>
    </div>
  );
}

export default DeathProgressBar;
