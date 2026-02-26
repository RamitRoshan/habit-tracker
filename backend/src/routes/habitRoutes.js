const router = require("express").Router();

const authMiddleware  = require("../middleware/authMiddleware");

const {createHabit,getHabits, updateHabit, deleteHabit,} = require("../controllers/habitController");

router.post("/", authMiddleware, createHabit);

router.get("/", authMiddleware, getHabits);

router.put("/:id", authMiddleware, updateHabit); //update

router.delete("/:id", authMiddleware, deleteHabit);

module.exports = router;

