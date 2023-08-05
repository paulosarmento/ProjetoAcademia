import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("Should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "john Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });
    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@gmail.com",
      })
    );
  });
});