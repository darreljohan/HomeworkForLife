import supertest from "supertest";
import { app } from "../application/app";
import { logger } from "../application/log";
import { UserTest } from "./user.test.util";
import { User } from "@supabase/supabase-js";

//jest.mock("../application/log");
describe("POST auth/register", () => {
  const email = "testerviajest_create@email.com";
  const password = "12341234";
  it("Should create new user", async () => {
    const response = await supertest(app)
      .post("/auth/register")
      .send({ email: email, password: password });

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe(email);
    await UserTest.deleteUser(response.body.data.id);
  });

  it("Should return an error if email is missing", async () => {
    const response = await supertest(app)
      .post("/auth/register")
      .send({ password: "12341234" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return an error if password is missing", async () => {
    const response = await supertest(app)
      .post("/auth/register")
      .send({ email: email });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return an error if email is invalid", async () => {
    const response = await supertest(app)
      .post("/auth/register")
      .send({ email: "invalid-email", password: password });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return an error if password is too short", async () => {
    const response = await supertest(app)
      .post("/auth/register")
      .send({ email: email, password: "1234" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

describe("POST auth/login", () => {
  let userMock: User | null;
  const email = "testerviajest_login@email.com";
  const password = "12341234";

  beforeAll(async () => {
    userMock = (await UserTest.createUser(email, password)).user;
  });

  it("Should login user", async () => {
    const response = await supertest(app)
      .post("/auth/login")
      .send({ email: email, password: password });

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe(email);
    const cookies = response.headers["set-cookie"];
    logger.info({
      location: "user.test",
      message: "Retuning cookies",
      body: cookies,
    });
    expect(cookies).toBeDefined();
  });

  it("Should return an error if email is missing", async () => {
    const response = await supertest(app)
      .post("/auth/login")
      .send({ password: password });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return an error if password is missing", async () => {
    const response = await supertest(app)
      .post("/auth/login")
      .send({ email: email });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return an error if credentials are invalid", async () => {
    const response = await supertest(app).post("/auth/login").send({
      email: email,
      password: "wrongpassword",
    });

    logger.info({
      location: "user.test",
      message: "Should return an error if credentials are invalid",
      body: response.body,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  afterAll(async () => {
    logger.info({
      location: "user.test",
      message: `Deleting user ${userMock?.email}`,
    });
    await UserTest.deleteUser(userMock?.id || "");
    logger.info({
      location: "user.test",
      message: `Finish delete user ${userMock?.email}`,
    });
  });
});

describe("POST auth/refresh-token", () => {
  let refreshToken: string | undefined;
  const email = "testerviajest_refreshtoken@email.com";
  const password = "12341234";
  beforeAll(async () => {
    await UserTest.createUser(email, password);

    const response = await supertest(app)
      .post("/auth/login")
      .send({ email: email, password: password });

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe(email);

    const cookies = response.headers["set-cookie"];
    expect(cookies).toBeDefined();

    refreshToken = UserTest.extractCookie(cookies, "refreshToken");
    expect(refreshToken).toBeDefined();
  });

  it("Should refresh token", async () => {
    const response = await supertest(app)
      .post("/auth/refresh")
      .set("Cookie", `refreshToken=${refreshToken}`);

    logger.info({
      location: "user.test",
      message: "Should refresh token",
      body: response.body,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.accessToken).toBeDefined();
  });

  it("Should return an error if refresh token is missing", async () => {
    const response = await supertest(app).post("/auth/refresh").send({});

    logger.info({
      location: "user.test",
      message: "Should return an error if refresh token is missing",
      body: response.body,
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  it("Should return an error if refresh token is invalid", async () => {
    const response = await supertest(app)
      .post("/auth/refresh")
      .set("Cookie", `refreshToken=invalidTOKEN`);

    logger.info({
      location: "user.test",
      message: "Should return an error if refresh token is invalid",
      body: response.body,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

describe("PUT user", () => {
  let refreshToken: string | undefined;
  let accessToken: string | undefined;
  const email = "testerviajest_putuser@gmail.com";
  const password = "12341243";

  beforeAll(async () => {
    await UserTest.createUser(email, password);

    const response = await supertest(app)
      .post("/auth/login")
      .send({ email: email, password: password });
    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe(email);

    const cookies = response.headers["set-cookie"];
    expect(cookies).toBeDefined();

    accessToken = response.body.data.accessToken;
    expect(accessToken).toBeDefined();
    refreshToken = UserTest.extractCookie(cookies, "refreshToken");
    expect(refreshToken).toBeDefined();
  });

  it("should update all user metadata", async () => {
    const response = await supertest(app)
      .put("/user")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Cookie", `refreshToken=${refreshToken}`)
      .send({
        displayName: "Test User",
        birthDate: new Date("1990-01-01").toISOString(),
        ageExpentancy: 80,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.config.displayName).toBe("Test User");
    expect(response.body.data.config.birthDate).toBe(
      "1990-01-01T00:00:00.000Z"
    );
    expect(response.body.data.config.ageExpentancy).toBe(80);
  });

  it("should return error if config is not complete", async () => {
    const response = await supertest(app)
      .put("/user")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Cookie", `refreshToken=${refreshToken}`)
      .send({
        displayName: "Test User",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return error if date not iso8601 is not complete", async () => {
    const response = await supertest(app)
      .put("/user")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Cookie", `refreshToken=${refreshToken}`)
      .send({
        displayName: "Test User",
        birthDate: "INVALID DATE",
        ageExpentancy: 80,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return error if auth is not valid", async () => {
    const response = await supertest(app)
      .put("/user")
      .set("Authorization", `Bearer invalid_token`)
      .set("Cookie", `refreshToken=${refreshToken}`)
      .send({
        displayName: "Test User",
        birthDate: "INVALID DATE",
        ageExpentancy: 80,
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });
});

describe("GET me", () => {
  let accessToken: string | undefined;
  const email = "testerviajest_getme@gmail.com";
  const password = "12341243";

  beforeAll(async () => {
    await UserTest.createUser(email, password);
    accessToken = (await UserTest.loginUser(email, password)).session
      ?.access_token;
  });

  it("should return user information by access token", async () => {
    const response = await supertest(app)
      .get("/auth")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data.config.displayName).toBeDefined();
    expect(response.body.data.config.ageExpentancy).toBeDefined();
  });

  it("should return error if auth is not valid", async () => {
    const response = await supertest(app)
      .get("/auth")
      .set("Authorization", `Bearer invalid_token`);

    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });
});
