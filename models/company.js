const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Company = sequelize.define("Company", {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactPerson: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  industry: {
    type: DataTypes.STRING
  },
  companySize: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT
  }
});

module.exports = Company;
