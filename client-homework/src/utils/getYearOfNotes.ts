import axios, { AxiosResponse } from "axios";
import { ResponseError } from "../error/ResponseError";
import { apiClient } from "./axiosInstance";
import dayjs from "dayjs";
import { Note } from "../models/note";

export async function getYearOfNotes(numberOfYears: number): Promise<Note[]> {
  const notesCookies = localStorage.getItem(`${numberOfYears}`);
  if (notesCookies) {
    const { data, lastUpdate } = JSON.parse(notesCookies) as {
      data: Note[];
      lastUpdate: string;
    };

    const isExpired = dayjs().diff(dayjs(lastUpdate), "hour") > 1;

    if (!isExpired) {
      return data;
    }
  }

  // Fetch new data if no cached data or if the cache is expired
  const result = await requestGetYearOfNotes(numberOfYears);
  saveNoteCookiesbyYear(numberOfYears, result);
  return result;
}

export async function requestGetYearOfNotes(
  numberOfYears: number
): Promise<Note[]> {
  console.log("HITTING API");
  try {
    const fromDate = dayjs(`${numberOfYears}-01-01`)
      .startOf("year")
      .toISOString();
    const toDate = dayjs(`${numberOfYears}-01-01`).endOf("year").toISOString();
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      throw new ResponseError("No Token provided", "Empty token");
    }
    const result: AxiosResponse<{ data: Note[] }> = await apiClient.get(
      "/note",
      {
        params: {
          fromDate: fromDate,
          toDate: toDate,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ResponseError;
      throw new ResponseError(errorResponse.message, errorResponse.name);
    } else {
      throw new ResponseError("Unknown error", "An unknown error occurred");
    }
  }
}

export async function saveNoteCookiesbyYear(
  numberOfYears: number,
  data: Note[]
) {
  const serializedData = JSON.stringify({
    data: data.map((note) => ({
      ...note,
      date_written: dayjs(note.dateWritten).toISOString(), // Ensure date is in string format
    })),
    lastUpdate: dayjs().toISOString(), // Add a timestamp for when the data was saved
  });

  localStorage.setItem(`${numberOfYears}`, serializedData);
}
