import { ReactNode, useRef, useState } from "react";
import { LoadingContext } from "./LoadingContext";
import Loading from "../component/Loading/Loading";
import Message from "../component/Message/Message";

type MessageObject = {
  message: string;
  status: boolean;
};
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageContent, setMessageContent] = useState<MessageObject>({
    message: "",
    status: false,
  });
  const [isMessage, setIsMessage] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setMessage = (message: string, status: boolean) => {
    setMessageContent({ message: message, status: status });
    setIsMessage(true);

    timeoutRef.current = window.setTimeout(() => {
      setIsMessage(false);
    }, 5000);
  };

  const closeMessage = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsMessage(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, setMessage }}>
      {isMessage ? (
        <Message
          message={
            messageContent.message || "No message is provided by the server"
          }
          status={messageContent.status || false}
          closeMessage={closeMessage}
        />
      ) : (
        <></>
      )}
      <Loading />
      {children}
    </LoadingContext.Provider>
  );
};
