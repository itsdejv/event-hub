"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.DATABASE_PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "";
// MongoDB connection
mongoose_1.default.connect(DATABASE_URL);
const db = mongoose_1.default.connection;
db.on("error", (err) => console.log(err));
db.once("open", (err) => console.log("Database connection established"));
app.use(express_1.default.json());
// Import and use the events router
const events_1 = __importDefault(require("./routes/events"));
app.use("/events", events_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
