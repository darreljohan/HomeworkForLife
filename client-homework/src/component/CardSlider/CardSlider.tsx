import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MOCK_DATA from "./MOCK_NOTE.json";
import { getRandomUniqueObjects } from "../../utils/getRandomNote";
import { fillMissingDates, get7LatestNote, Note } from "../../models/note";
import "./CardSlider.css";
import TodayStoryCard from "../StoryCard/TodayStoryCard";
import dayjs from "dayjs";
import { pageContext } from "../../context/PageContext";
import { IoMdApps } from "react-icons/io";

const RenderLoadingComponent: React.FC = () => {
  return (
    <div className="cardSlider-spinner-container">
      <div className="cardSlider-spinner"></div>
    </div>
  );
};

const CardSlider: React.FC = () => {
  const { user } = useContext(authContext);
  const [randomNotes, setRandomNotes] = useState<Array<Note>>([]);
  const { setPage } = useContext(pageContext);
  const [cardSliderLoading, setCardSliderLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setCardSliderLoading(true);
      try {
        const notes = await get7LatestNote();
        const filledNotes = fillMissingDates(notes); // Call the async function
        setRandomNotes(filledNotes); // Set the state with the fetched notes
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
      setCardSliderLoading(false);
    };

    if (user) {
      fetchNotes();
    } else {
      const notes = getRandomUniqueObjects(MOCK_DATA, 6);
      setRandomNotes(notes); // Initially render the first 3 notes
    }

    fetchNotes();
  }, [user]);

  return (
    <div className="CardSlider">
      <div className="CardSliderHeader">
        <h1 className="CardSliderMenuName">Your Whole Week's Story</h1>
        <button className="ShowAllCard" onClick={() => setPage("Showcase")}>
          <IoMdApps className="ShowAllCardIcon" />
          <p>Show All Card</p>
        </button>
      </div>
      <div className="WeekCardSlider">
        {cardSliderLoading ? (
          <RenderLoadingComponent />
        ) : (
          randomNotes.map((note) => (
            <TodayStoryCard
              key={note.id}
              isPlaceholder={note.isPlaceholder || false}
              id={note.id}
              dateWritten={dayjs(note.dateWritten)}
              note={note.note}
              isToday={dayjs(note.dateWritten).isSame(dayjs(), "date")}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CardSlider;
