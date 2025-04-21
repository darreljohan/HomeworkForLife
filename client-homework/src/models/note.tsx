import axios from "axios";
import { ResponseError } from "../error/ResponseError";
import dayjs, { Dayjs } from "dayjs";

export type Note = {
  id: string;
  dateWritten: string;
  note: string;
};

export const fillMissingDates = (notes: Array<Note>): Array<Note> => {
  const now = dayjs();
  const last7Days: Array<Dayjs> = Array.from({ length: 7 }, (_, i) =>
    now.subtract(i, "day")
  );

  const notesByDate = new Map(
    notes.map((note) => [dayjs(note.dateWritten).format("YYYY-MM-DD"), note])
  );

  const filledNotes: Array<Note> = last7Days.map((date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    if (notesByDate.has(formattedDate)) {
      return notesByDate.get(formattedDate)!; // Use the existing note
    } else {
      // Create a placeholder note for missing dates
      return {
        id: `placeholder-${formattedDate}`,
        dateWritten: formattedDate,
        note: "No note for this day",
      };
    }
  });

  return filledNotes;
};

export async function get7LatestNote() {
  try {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      throw new ResponseError("Empty access token", "Please login again");
    }
    const response = await axios.get<{ data: Note[] }>(
      `${import.meta.env.VITE_API_URL}/note`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fromDate: dayjs().subtract(7, "day").toISOString(),
          toDate: dayjs().toISOString(),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ResponseError;
      throw new ResponseError(errorResponse.name, errorResponse.message);
    } else {
      throw new ResponseError("Uncaught Error", "Unknown Message");
    }
  }
}
