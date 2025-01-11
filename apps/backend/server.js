require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", (err) => console.log("Database connection established"));

app.use(express.json());

const eventsRouter = require("./routes/events");
app.use("/events", eventsRouter);

app.listen(process.env.DATABASE_PORT, () => {
  console.log(`Server is running on port ${process.env.DATABASE_PORT}`);
});
