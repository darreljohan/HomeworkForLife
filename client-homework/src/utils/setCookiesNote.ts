import dayjs from "dayjs";
import { Note } from "../models/note";

export function setCookiesNote(numberOfYear: number, arrayOfNotes: Note[]) {
  const lastUpdate = dayjs().toISOString();
  const stringArrayOfNotes = JSON.stringify({
    data: arrayOfNotes,
    lastUpdate: lastUpdate,
  });
  localStorage.setItem(`${numberOfYear}`, stringArrayOfNotes);
}
