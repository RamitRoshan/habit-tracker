const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  markComplete,
  getLogs,
  getHabitLogs,
} = require("../controllers/logController");

router.post("/", authMiddleware, markComplete);

router.get("/", authMiddleware, getLogs);

// Get single habit history
router.get("/:habitId", authMiddleware, getHabitLogs);

module.exports = router;
