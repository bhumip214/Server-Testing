const db = require("../data/dbConfig.js");

function getAll() {
  return db("friends");
}

async function insert(friend) {
  const [id] = await db("friends").insert(friend, "id");

  return db("friends")
    .where({ id })
    .first();
}

async function remove(id) {
  return db("friends")
    .where("id", id)
    .del();
}

module.exports = {
  getAll,
  insert,
  remove
};
