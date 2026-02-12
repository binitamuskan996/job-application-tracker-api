const express = require("express");
const auth = require("../middleware/auth");
const reminderController = require("../controllers/reminderController");

const router = express.Router();

router.post("/add/:applicationId", auth.authenticate, reminderController.createReminder);
router.get("/get", auth.authenticate, reminderController.getReminders);

module.exports = router;
