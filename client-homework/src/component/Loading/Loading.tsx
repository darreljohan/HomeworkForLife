import React from "react";
import "./Loading.css";
import { useLoading } from "../../context/LoadingContext";

const Loading: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
