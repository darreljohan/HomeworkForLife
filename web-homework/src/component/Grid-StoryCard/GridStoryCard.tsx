import { useEffect, useState } from "react";
import { Note } from "../../models/note";
import CardGridStoryAdd from "../Card-GridStory/cardGridStoryAdd";
import "./GridStoryCard.css";
import MOCK_DATA from "./MOCK_NOTE.json";
import CardGridStory from "../Card-GridStory/CardGridStory";

function getRandomUniqueObjects(data: Array<Note>, count: number): Array<Note> {
  if (data.length < count) {
    return data;
  }
  const shuffled = [...data].sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffled.slice(0, count); // Pick the first `count` items
}

export default function GridStoryCard() {
  const [randomNote, setRandomNote] = useState<Array<Note>>([]);

  useEffect(() => {
    setRandomNote(getRandomUniqueObjects(MOCK_DATA, 18));
  }, []);

  return (
    <div className="gridStoryCard">
      <div className="randomCard">
        {randomNote.map((note, index) => (
          <CardGridStory
            key={index}
            dateWritten={new Date(note.date_written)}
            note={note.note}
          />
        ))}
      </div>
      <CardGridStoryAdd />
    </div>
  );
}
