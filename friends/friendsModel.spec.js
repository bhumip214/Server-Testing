const db = require("../data/dbConfig.js");
const Friends = require("../friends/friendsModel");

describe("Friends model", () => {
  describe("insert()", () => {
    afterEach(async () => {
      await db("friends").truncate();
    });

    it("should insert new friend into the db", async () => {
      const friend = await Friends.insert({ name: "Sarah" });
      expect(friend.name).toBe("Sarah");
    });
  });
});
