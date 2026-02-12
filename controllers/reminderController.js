const Reminder = require("../models/reminder");
const JobApplication = require("../models/jobApplication");

const createReminder = async (req, res) => {
  try {
    const { reminderDate, message } = req.body;
    const applicationId = req.params.applicationId;

    const application = await JobApplication.findOne({
      where: { id: applicationId, UserId: req.user.id }
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const reminder = await Reminder.create({
      reminderDate,
      message,
      UserId: req.user.id,
      JobApplicationId: applicationId
    });

    res.status(201).json({ message: "Reminder created", reminder });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({
      where: { UserId: req.user.id }
    });

    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReminder, getReminders };
