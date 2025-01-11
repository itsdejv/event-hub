import mongoose, { Schema } from "mongoose";

export const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Event = mongoose.model("Event", eventSchema);
