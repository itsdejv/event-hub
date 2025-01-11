import request from "supertest";
import { app, Shutdown } from "../../src/server";

describe("Our application", () => {
  afterAll((done) => {
    Shutdown(done);
  });

  it("Start and has a proper test environment", async () => {
    expect(process.env.NODE_ENV).toBe("test");
    expect(app).toBeDefined();
  }, 10000);

  it("Returns all options allowed to be called by a customer (http methods)", async () => {
    const response = await request(app).options("/events");
    expect(response.status).toBe(200);
    expect(response.headers["access-control-allow-methods"]).toBe(
      "GET,HEAD,PUT,PATCH,POST,DELETE",
    );
  });
});
