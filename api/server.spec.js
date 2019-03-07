const request = require("supertest");

const server = require("./server.js");

describe("GET '/'", () => {
  it("should return 200 OK", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(200);
  });

  it("should return JSON", async () => {
    const res = await request(server).get("/");

    expect(res.type).toBe("application/json");
  });

  it('should return "Lambda Server Testing"', async () => {
    const res = await request(server).get("/");

    expect(res.body).toEqual("Lambda Server Testing");
  });
});
