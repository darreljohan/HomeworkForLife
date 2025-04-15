import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MOCK_DATA from "./MOCK_NOTE.json";
import { getRandomUniqueObjects } from "../../utils/getRandomNote";
import { fillMissingDates, get7LatestNote, Note } from "../../models/note";
import "./CardSlider.css";
import TodayStoryCard from "../StoryCard/TodayStoryCard";
import dayjs from "dayjs";
import { pageContext } from "../../context/PageContext";

const CardSlider: React.FC = () => {
  const { user } = useContext(authContext);
  const [randomNotes, setRandomNotes] = useState<Array<Note>>([]);
  const { setPage } = useContext(pageContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await get7LatestNote();
        const filledNotes = fillMissingDates(notes); // Call the async function
        setRandomNotes(filledNotes); // Set the state with the fetched notes
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
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
      <button className="ShowAllCard" onClick={() => setPage("Showcase")}>
        <p>Show All Card</p>
      </button>
      <div className="WeekCardSlider">
        {randomNotes.map((note) => (
          <TodayStoryCard
            key={note.id}
            dateWritten={dayjs(note.date_written)}
            note={note.note}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
