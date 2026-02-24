const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {markComplete,getLogs,} = require("../controllers/logController");

router.post("/", auth, markComplete);

router.get("/", auth, getLogs);

module.exports = router;