const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/db-connection");
const dotenv = require('dotenv');
dotenv.config();
require("./cron/reminderCron");

const indexModel = require("./models/index");

const PORT=process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoute");
const userRoutes = require("./routes/userRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobListingRoutes = require("./routes/jobListingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reminders", reminderRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job-listings", jobListingRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
