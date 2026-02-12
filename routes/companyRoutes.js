const express = require("express");
const auth = require("../middleware/auth");
const companyController = require("../controllers/companyController");

const router = express.Router();

router.post("/add", auth.authenticate, companyController.createCompany);
router.get("/get", auth.authenticate, companyController.getCompanies);
router.put("/update/:id", auth.authenticate, companyController.updateCompany);
router.delete("/delete/:id", auth.authenticate, companyController.deleteCompany);

module.exports = router;
