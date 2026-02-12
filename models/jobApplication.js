const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const JobApplication = sequelize.define("JobApplication", {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  applicationDate: {
    type: DataTypes.DATEONLY
  },
  status: {
    type: DataTypes.ENUM(
      "applied",
      "interviewed",
      "offered",
      "rejected",
      "accepted"
    ),
    defaultValue: "applied"
  },
  notes: {
    type: DataTypes.TEXT
  }
});

module.exports = JobApplication;
