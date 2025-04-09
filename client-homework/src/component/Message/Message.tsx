import React from "react";
import "./Message.css";
import { SiTicktick } from "react-icons/si";
import { SlClose } from "react-icons/sl";

type MessageProps = {
  status: boolean;
  message: string;
  closeMessage: () => void;
};
const Message: React.FC<MessageProps> = (props) => {
  const toggleMessage = () => {
    props.closeMessage();
  };

  return (
    <div className="message-overlay " onClick={toggleMessage}>
      <div className="message-background">
        <div className="message-container">
          <div className="status">
            {props.status ? (
              <SiTicktick className="SuccessLogo" />
            ) : (
              <SlClose className="FailedLogo" />
            )}
          </div>
          <div className="message">{props.message}</div>
        </div>
        <div className="close-hint">Tap to close</div>
      </div>
    </div>
  );
};

export default Message;
