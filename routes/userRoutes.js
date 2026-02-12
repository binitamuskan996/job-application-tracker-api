const express = require("express");
const auth = require("../middleware/auth");
const userController= require("../controllers/userController");

const router = express.Router();

router.get("/get", auth.authenticate, userController.getProfile);
router.put("/update", auth.authenticate, userController.updateProfile);

module.exports = router;
