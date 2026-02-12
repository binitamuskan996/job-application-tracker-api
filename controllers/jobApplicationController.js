const JobApplication = require("../models/jobApplication");
const { Op } = require("sequelize");

const createApplication = async (req, res) => {
  try {
    const application = await JobApplication.create({
      ...req.body,
      UserId: req.user.id
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create job application",
      error: err.message
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const apps = await JobApplication.findAll({
      where: { UserId: req.user.id }
    });

    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: err.message
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const updated = await JobApplication.update(req.body, {
      where: { id: req.params.id, UserId: req.user.id}
    });

    if (updated[0] === 0) {
      return res.status(404).json({
        message: "Application not found or not authorized"
      });
    }
    const application = await JobApplication.findByPk(req.user.id);
    res.status(200).json({ message: "Application updated successfully",data:application });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update application",
      error: err.message
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const deleted = await JobApplication.destroy({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Application not found or not authorized"
      });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete application",
      error: err.message
    });
  }
};
const searchApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { keyword } = req.query;

    const applications = await JobApplication.findAll({
      where: {
        UserId: userId,
        [Op.or]: [
          { companyName: { [Op.like]: `%${keyword}%` } },
          { jobTitle: { [Op.like]: `%${keyword}%` } },
          { notes: { [Op.like]: `%${keyword}%` } },
           {status: { [Op.like]: `%${keyword}%` } }
        ]
      }
    });

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
};
const filterApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, startDate, endDate } = req.query;

    let whereCondition = {
      UserId: userId
    };

    if (status) {
      whereCondition.status = status;
    }

    if (startDate && endDate) {
      whereCondition.applicationDate = {
        [Op.between]: [startDate, endDate]
      };
    }

    const applications = await JobApplication.findAll({
      where: whereCondition
    });

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: "Filter failed",
      error: error.message
    });
  }
};

module.exports={getApplications,createApplication,updateApplication,deleteApplication,searchApplications,filterApplications}
