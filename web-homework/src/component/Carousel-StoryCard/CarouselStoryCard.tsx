import { useEffect, useState } from "react";
import { Note } from "../../models/note";
import "./CarouselStoryCard.css";
import MOCK_DATA from "./MOCK_NOTE.json";
import CardStory from "../Card-Story/CardStory";
import CardStoryAdd from "../Card-Story/CardStoryAdd";
import WindowJournalShowcase from "../Window-JournalShowcase/WindowJournalShowcase";

function getRandomUniqueObjects(data: Array<Note>, count: number): Array<Note> {
  if (data.length < count) {
    return data;
  }
  const shuffled = [...data].sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffled.slice(0, count); // Pick the first `count` items
}

export default function CarouselStoryCard() {
  // Note object state
  const [randomNotes, setRandomNotes] = useState<Array<Note>>([]);
  const [showAllCard, setShowAllCard] = useState<boolean>(false);

  useEffect(() => {
    setRandomNotes(getRandomUniqueObjects(MOCK_DATA, 6));
  }, []);

  const toggleAllCard = () => {
    setShowAllCard(true);
  };

  return (
    <>
      {showAllCard && <WindowJournalShowcase />}
      <div className="carouselStoryCard">
        <button className="showAllStory" onClick={() => toggleAllCard()}>
          See All Card
        </button>
        <div className="carouselContainer">
          <CardStoryAdd />
          {randomNotes.map((card) => (
            <CardStory
              note={card.note}
              dateWritten={new Date(card.date_written)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
