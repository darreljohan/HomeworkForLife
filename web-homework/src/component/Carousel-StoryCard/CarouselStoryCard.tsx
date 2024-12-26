import { useEffect, useState } from "react";
import { Note } from "../../models/note";
import "./CarouselStoryCard.css";
import MOCK_DATA from "./MOCK_NOTE.json";

function getRandomUniqueObjects(data: Array<Note>, count: number): Array<Note> {
  if (data.length < count) {
    return data;
  }
  const shuffled = [...data].sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffled.slice(0, count); // Pick the first `count` items
}

export default function CarouselStoryCard() {
  const [randomNote, setRandomNote] = useState<Array<Note>>([]);

  useEffect(() => {
    setRandomNote(getRandomUniqueObjects(MOCK_DATA, 7));
  }, []);

  return (
    <div className="carouselStoryCard">
      <div className="showAllStory">See All Card</div>
      <div className="carouselContainer">
        <div className="slideLeft"></div>
        <div className="cardSlider"></div>
        <div className="slideRight"></div>
      </div>
    </div>
  );
}
