const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Reminder = sequelize.define("Reminder", {
  reminderDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Reminder;
