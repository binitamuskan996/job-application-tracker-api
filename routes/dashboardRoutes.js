const express = require("express");
const auth = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.get("/overview", auth.authenticate, dashboardController.getDashboardOverview);

module.exports = router;
