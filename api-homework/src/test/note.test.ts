import supertest from "supertest";
import { app } from "../application/app";

import { UserTest } from "./user.test.util";
import { NoteTest } from "./note.test.util";
import { Session } from "@supabase/supabase-js";
describe("POST note", () => {
  const firstDate = new Date(Date.UTC(2024, 1, 13, 0, 0, 0));
  const secondDate = new Date(Date.UTC(2024, 1, 2, 0, 0, 0));

  let session: Session | null;
  beforeAll(async () => {
    await UserTest.createUser("testerviajest_createnote@email.com", "12341234");
    session = (
      await UserTest.loginUser("testerviajest_createnote@email.com", "12341234")
    ).session;
  });

  afterAll(async () => {
    await NoteTest.deleteAllNote(session?.user.id || "");
  });
  it("Should create note", async () => {
    const response = await supertest(app)
      .post("/note")
      .set("Authorization", `Bearer ${session?.access_token}`)
      .send({
        dateWritten: firstDate.toISOString(),
        note: "This is a note 2",
      });

    expect(response.status).toBe(200);
    expect(new Date(response.body.data.dateWritten).toISOString()).toBe(
      firstDate.toISOString()
    );
  });

  it("Should return error if there is same date", async () => {
    const response = await supertest(app)
      .post("/note")
      .set("Authorization", `Bearer ${session?.access_token}`)
      .send({
        dateWritten: firstDate.toISOString(),
        note: "This is a same date nore",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return error if date written is empty", async () => {
    const response = await supertest(app)
      .post("/note")
      .set("Authorization", `Bearer ${session?.access_token}`)
      .send({
        dateWritten: "",
        note: "This is a same date nore",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return error if date written is null", async () => {
    const response = await supertest(app)
      .post("/note")
      .set("Authorization", `Bearer ${session?.access_token}`)
      .send({
        note: "This is a same date noye",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return error if note written is null", async () => {
    const response = await supertest(app)
      .post("/note")
      .set("Authorization", `Bearer ${session?.access_token}`)
      .send({
        dateWritten: secondDate.toISOString(),
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

describe("GET note", () => {
  let session: Session | null;
  let createdNote: Array<{ dateWritten: string; note: string }> | undefined;

  beforeAll(async () => {
    await UserTest.createUser("testviajest_createuser@gmail.com", "12341234");
    session = (
      await UserTest.loginUser("testviajest_createuser@gmail.com", "12341234")
    ).session;
    createdNote = await NoteTest.createWeekNote(session?.access_token || "");
  });

  afterAll(async () => {
    await NoteTest.deleteAllNote(session?.user.id || "");
  });
  it("Should get 7 notes in a week", async () => {
    const response = await supertest(app)
      .get("/note")
      .set("Authorization", `Bearer ${session?.access_token || ""}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBe(7);
  });

  it("Should get 4 notes  with from and to date", async () => {
    const response = await supertest(app)
      .get("/note")
      .set("Authorization", `Bearer ${session?.access_token || ""}`)
      .send({
        fromDate: createdNote![3].dateWritten,
        toDate: createdNote![0].dateWritten,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBe(4);
  });
});

describe("PUT note", () => {
  let session: Session | null;
  let createdNote:
    | Array<{ id: string; dateWritten: string; note: string }>
    | undefined;

  beforeAll(async () => {
    await UserTest.createUser("testerviajest_putNote@email.com", "12341234");
    session = (
      await UserTest.loginUser("testerviajest_putNote@email.com", "12341234")
    ).session;
    createdNote = await NoteTest.createWeekNote(session?.access_token || "");
  });

  afterAll(async () => {
    await NoteTest.deleteAllNote(session?.user.id || "");
  });

  it("Should update today date", async () => {
    const response = await supertest(app)
      .put("/note")
      .set("Authorization", `Bearer ${session?.access_token || ""}`)
      .send({
        id: createdNote![0].id,
        note: "This is updated note",
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.note).toBe("This is updated note");
  });

  it("Should return error if id invalid", async () => {
    const response = await supertest(app)
      .put("/note")
      .set("Authorization", `Bearer ${session?.access_token || ""}`)
      .send({
        id: "invalid_id",
        note: "This is updated note",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
