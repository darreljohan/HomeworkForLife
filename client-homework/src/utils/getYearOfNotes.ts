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
    return data;
  } else {
    const result = await requestGetYearOfNotes(numberOfYears);
    return result;
  }
}

export async function requestGetYearOfNotes(numberOfYears: number) {
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
