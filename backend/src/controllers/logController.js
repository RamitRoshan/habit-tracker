const HabitLog = require("../models/HabitLog");

exports.markComplete = async (req, res) => {
  try {
    const { habitId } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const existing = await HabitLog.findOne({
      habitId,
      userId: req.user.id,
      date: today,
    });

    if (existing)
      return res.status(400).json({
        message: "Already completed today",
      });

    const log = await HabitLog.create({
      habitId,
      userId: req.user.id,
      date: today,
    });

    res.json(log);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await HabitLog.find({
      userId: req.user.id,
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};