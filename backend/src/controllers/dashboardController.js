const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // total habits
    const totalHabits = await Habit.countDocuments({ userId });

    // total logs
    const totalLogs = await HabitLog.countDocuments({ userId });

    // completion percentage
    const completionPercentage =
      totalHabits === 0
        ? 0
        : Math.min(
            100,
            Math.round((totalLogs / totalHabits) * 100)
          );

    // get logs sorted by date
    const logs = await HabitLog.find({ userId }).sort({ date: -1 });

    // calculate streak
    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const logDates = logs.map(log => {
      const d = new Date(log.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    });

    while (logDates.includes(today.getTime())) {
      streak++;
      today.setDate(today.getDate() - 1);
    }

    // weekly progress (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6);
    weekAgo.setHours(0, 0, 0, 0);

    const weeklyLogs = logs.filter(log => {
      return new Date(log.date) >= weekAgo;
    });

    res.json({
      totalHabits,
      totalLogs,
      completionPercentage,
      currentStreak: streak,
      weeklyProgress: weeklyLogs.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};