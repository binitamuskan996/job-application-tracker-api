const JobListing = require("../models/jobListing");

const saveJobListing = async (req, res) => {
  try {
    const listing = await JobListing.create({
      ...req.body,
      UserId: req.user.id
    });

    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Failed to save job listing", error: err.message });
  }
};

const getSavedListings = async (req, res) => {
  try {
    const listings = await JobListing.findAll({
      where: { UserId: req.user.id }
    });

    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listings", error: err.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const deleted = await JobListing.destroy({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete listing", error: err.message });
  }
};

module.exports = {
  saveJobListing,
  getSavedListings,
  deleteListing
};
