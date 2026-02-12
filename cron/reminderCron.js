const cron = require("node-cron");
const { Op } = require("sequelize");
const Reminder = require("../models/reminder");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

cron.schedule("* * * * *", async () => {
  try {
    console.log("Checking reminders...");

    const now = new Date();

    const reminders = await Reminder.findAll({
      where: {
        reminderDate: { [Op.lte]: now },
        isSent: false
      },
      include: [User]
    });
    console.log(reminders)
    for (let reminder of reminders) {
      await sendEmail(
        reminder.User.email,
        "Job Application Reminder",
        `Reminder: ${reminder.message}`
      );

      reminder.isSent = true;
      await reminder.save();
    }

  } catch (err) {
    console.error("Cron error:", err);
  }
});
