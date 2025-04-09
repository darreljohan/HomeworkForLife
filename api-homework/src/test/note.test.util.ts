import dayjs from "dayjs";
import { app } from "../application/app";
import supertest from "supertest";

import supabase from "../application/database";

export class NoteTest {
  static async createWeekNote(
    accessToken: string
  ): Promise<Array<{ id: string; dateWritten: string; note: string }>> {
    const notes = [];
    const now = dayjs();
    const result = [];

    for (let i = 0; i < 7; i++) {
      const dateWritten = now.subtract(i, "day").toISOString();
      const note = `This is a note for ${now
        .subtract(i, "day")
        .format("YYYY-MM-DD")}`;

      notes.push({
        dateWritten,
        note,
      });
    }

    //divide to makesure that the notes are created in parallel
    for (const note of notes) {
      const response = await supertest(app)
        .post("/note")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(note);

      result.push({
        id: response.body.data.id,
        dateWritten: response.body.data.dateWritten,
        note: response.body.data.note,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to create note: ${response.body.error}`);
      }
    }

    return result;
  }

  static async deleteAllNote(ownerId: string) {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("owner", ownerId);

    if (error) {
      throw new Error(`Failed to delete all notes: ${error.message}`);
    }
  }
}
