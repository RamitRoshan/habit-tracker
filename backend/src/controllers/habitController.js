const Habit = require("../models/Habit");


// CREATE HABIT
exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json(habit);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL HABITS
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(habits);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE HABIT  ✅ NEW FEATURE
exports.updateHabit = async (req, res) => {
  try {

    const { title, description } = req.body;

    const habit = await Habit.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        title,
        description,
      },
      {
        new: true,
      }
    );

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    res.json(habit);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE HABIT
exports.deleteHabit = async (req, res) => {
  try {

    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    res.json({
      message: "Habit deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};