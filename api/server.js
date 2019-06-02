const express = require("express");

const Friends = require("../friends/friendsModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json("Lambda Server Testing");
});

server.get("/friends", async (req, res) => {
  const friends = await Friends.getAll();

  res.status(200).json(friends);
});

server.post("/friends", async (req, res) => {
  try {
    if (req.body.name) {
      const friend = await Friends.insert(req.body);

      res.status(201).json(friend);
    } else {
      res.status(400).json({
        errorMessage: "Please provide the name of a friend."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error while adding a new friend to the database"
    });
  }
});

server.delete("/friends/:id", async (req, res) => {
  try {
    const count = await Friends.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The friend has been removed" });
    } else {
      res.status(404).json({ message: "The friend could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the friend"
    });
  }
});

module.exports = server;
