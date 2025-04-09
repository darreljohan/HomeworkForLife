import React from "react";
import Navbar from "../../component/Navbar/navbar";
import "./Home.css";
import DeathReminder from "../../component/DeathReminder/DeathReminder";
import DeathProgressBar from "../../component/DeathProgressBar/DeathProgressBar";
import CardSlider from "../../component/CardSlider/CardSlider";
import EndQuotes from "../../component/EndQuotes/EndQuotes";

const Home: React.FC = () => {
  return (
    <div className="Home">
      <Navbar />
      <DeathReminder />
      <DeathProgressBar />
      <CardSlider />
      <EndQuotes />
    </div>
  );
};

export default Home;
