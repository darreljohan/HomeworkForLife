import { useState } from "react";
import BackgroundBlur from "../Background-Blur/BackgroundBlur";
import "./LoadingRegister.css";

export default function LoadingRegister() {
  const [status, setStatus] = useState<number>(0);

  const renderStatus = (): React.ReactNode => {
    switch (status) {
      case 0:
        setTimeout(() => {
          setStatus(1);
        }, 1000);
        return (
          <div className="loadingBox">
            <div className={`spinner ${status === 0 ? "show" : ""}`}></div>
            <div className="loadingText">Loading</div>
          </div>
        );
      case 1:
        return (
          <div className="loadingBox">
            <div className={`tick ${status === 1 ? "show" : ""}`}></div>
            <div className="loadingText">Success</div>
          </div>
        );
    }
  };

  return (
    <>
      <BackgroundBlur zIndex={1009} />
      <div className="loadingRegister">{renderStatus()}</div>
    </>
  );
}
