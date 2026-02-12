const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Application_files = sequelize.define("application_files", {
  fileUrl: {
    type: DataTypes.TEXT, 
    allowNull: false
  }
});

module.exports = Application_files;