const sequelize = require("../utils/db-connection");
const User = require("./user");
const JobApplication = require("./jobApplication");
const Application_files=require('./application_files');
const Reminder = require("./reminder");
const Company = require("./company");
const JobListing = require("./jobListing");

User.hasMany(JobApplication);
JobApplication.belongsTo(User);

JobApplication.hasMany(Application_files);
Application_files.belongsTo(JobApplication);

User.hasMany(Reminder);
Reminder.belongsTo(User);

JobApplication.hasMany(Reminder);
Reminder.belongsTo(JobApplication);

User.hasMany(Company);
Company.belongsTo(User);

User.hasMany(JobListing);
JobListing.belongsTo(User);

module.exports = sequelize;
