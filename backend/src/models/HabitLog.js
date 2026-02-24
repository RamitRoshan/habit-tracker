const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const logSchema = new Schema({
  habitId: {
    type: Schema.Types.ObjectId,
    ref: "Habit",
  },
  date: {
    type: String,
  },

},{ timestamps: true });


const HabitLog = model('HabitLog', logSchema);
module.exports = HabitLog;