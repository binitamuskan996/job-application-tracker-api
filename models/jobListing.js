const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const JobListing = sequelize.define("JobListing", {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobLink: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  location: {
    type: DataTypes.STRING
  }
});

module.exports = JobListing;
