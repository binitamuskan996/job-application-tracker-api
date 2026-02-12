const JobApplication = require("../models/jobApplication");

const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalApplications = await JobApplication.count({
      where: { UserId: userId }
    });

    const applied = await JobApplication.count({
      where: { UserId: userId, status: "applied" }
    });

    const interviewed = await JobApplication.count({
      where: { UserId: userId, status: "interviewed" }
    });

    const offered = await JobApplication.count({
      where: { UserId: userId, status: "offered" }
    });

    const rejected = await JobApplication.count({
      where: { UserId: userId, status: "rejected" }
    });

    const accepted = await JobApplication.count({
      where: { UserId: userId, status: "accepted" }
    });

    const responded = interviewed + offered + accepted;

    const responseRate =
      totalApplications > 0
        ? ((responded / totalApplications) * 100).toFixed(2) + "%"
        : "0%";

    res.status(200).json({
      totalApplications,
      applied,
      interviewed,
      offered,
      rejected,
      accepted,
      responseRate
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch dashboard overview",
      error: error.message
    });
  }
};
module.exports={getDashboardOverview}
