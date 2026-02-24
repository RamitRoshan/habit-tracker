const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      userId: req.user.id,
    });

    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);

    res.json({
      message: "Habit deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};