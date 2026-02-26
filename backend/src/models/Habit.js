const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const habitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Habit = model("Habit", habitSchema);
module.exports = Habit;
