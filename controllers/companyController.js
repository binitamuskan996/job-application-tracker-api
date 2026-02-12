const Company = require("../models/company");


const createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      UserId: req.user.id
    });

    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create company",
      error: err.message
    });
  }
};


const getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      where: { UserId: req.user.id }
    });

    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch companies",
      error: err.message
    });
  }
};


const updateCompany = async (req, res) => {
  try {
    const updated = await Company.update(
      req.body,
      {
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
      }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company updated successfully" });

  } catch (err) {
    res.status(500).json({
      message: "Failed to update company",
      error: err.message
    });
  }
};


const deleteCompany = async (req, res) => {
  try {
    const deleted = await Company.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully" });

  } catch (err) {
    res.status(500).json({
      message: "Failed to delete company",
      error: err.message
    });
  }
};


module.exports = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany
};
