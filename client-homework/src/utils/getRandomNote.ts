import { Note } from "../models/note";

export function getRandomUniqueObjects(
  data: Array<Note>,
  count: number
): Array<Note> {
  if (data.length < count) {
    return data;
  }
  const shuffled = [...data].sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffled.slice(0, count); // Pick the first `count` items
}
