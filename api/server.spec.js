const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");

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

describe("Friends endpoints", () => {
  describe("GET '/friends'", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/friends");

      expect(res.status).toBe(200);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/friends");

      expect(res.type).toBe("application/json");
    });

    it("should return friends", async () => {
      const res = await request(server).get("/friends");

      expect(res.body).toEqual([]);
    });
  });

  describe("POST '/friends'", () => {
    afterEach(async () => {
      await db("friends").truncate();
    });

    it("should return 201 when adding a new friend ", async () => {
      const friend = { name: "sarah" };
      const res = await request(server)
        .post("/friends")
        .send(friend);

      expect(res.status).toBe(201);
    });

    it("should return 400 when name not provided", async () => {
      const friend = { name: "" };
      const res = await request(server)
        .post("/friends")
        .send(friend);

      expect(res.status).toBe(400);
    });

    it("should insert new friend into the db", async () => {
      const friend = { name: "sarah" };
      const res = await request(server)
        .post("/friends")
        .send(friend);

      expect(friend.name).toBe("sarah");
    });
  });

  describe("DELETE '/friends/:id'", () => {
    it("should return JSON", async () => {
      const res = await request(server).delete("/friends/:id");

      expect(res.type).toEqual("application/json");
    });

    it("should delete a friend and return 200", async () => {
      const res = await request(server).delete("/friends/1");

      expect(res.status).toBe(200);
    });
  });
});
