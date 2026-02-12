const express = require("express");
const auth = require("../middleware/auth");
const jobListingController = require("../controllers/jobListController");

const router = express.Router();

router.post("/save", auth.authenticate, jobListingController.saveJobListing);
router.get("/get", auth.authenticate, jobListingController.getSavedListings);
router.delete("/delete/:id", auth.authenticate, jobListingController.deleteListing);

module.exports = router;
