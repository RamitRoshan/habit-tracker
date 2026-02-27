const HabitLog = require("../models/HabitLog");

//mark habit complete
exports.markComplete = async (req, res) => {
  try {
    const { habitId } = req.body;

    if (!habitId) {
      return res.status(400).json({
        message: "habitId is required",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    //preventing dublications
    const existing = await HabitLog.findOne({
      habitId,
      userId: req.user.id,
      date: today,
    });

    if (existing) {
      return res.status(400).json({
        message: "Habit already completed today",
      });
    }

    const log = await HabitLog.create({
      habitId,
      userId: req.user.id,
      date: today,
    });

    res.status(201).json({
      message: "Habit marked complete",
      log,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//gets all logs of users
exports.getLogs = async (req, res) => {
  try {
    const logs = await HabitLog.find({
      userId: req.user.id,
    })
      .populate("habitId", "title description")
      .sort({ date: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}; 

// gets log of single habit
exports.getHabitLogs = async (req, res) => {
  try {
    const habitId = req.params.habitId;

    const logs = await HabitLog.find({
      habitId,
      userId: req.user.id,
    }).sort({ date: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
