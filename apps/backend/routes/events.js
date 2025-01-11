const express = require("express");
const router = express.Router();
const Event = require("../models/event");

const getEvent = async (req, res, next) => {
  let event;
  try {
    event = await Event.findById(req.params.id);

    if (event === null) {
      return res.status(404).json({ message: "Cannot find event" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
};

// Getting all
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:id", getEvent, (req, res) => {
  res.send(res.event);
});

// Creating one
router.post("/", async (req, res) => {
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/:id", getEvent, async (req, res) => {
  if (req.body.name != null) {
    res.event.name = req.body.name;
  }

  if (req.body.description != null) {
    res.event.description = req.body.description;
  }

  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete("/:id", getEvent, async (req, res) => {
  try {
    await res.event.deleteOne();
    res.json({ message: "Deleted event" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
