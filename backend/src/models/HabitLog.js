const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const logSchema = new Schema({
  habitId: {
    type: Schema.Types.ObjectId,
    ref: "Habit",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

},{ timestamps: true });


const HabitLog = model('HabitLog', logSchema);
module.exports = HabitLog;