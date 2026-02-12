const express = require("express");
const auth = require("../middleware/auth");
const applicationController = require("../controllers/jobApplicationController");
const upload = require("../middleware/upload");
const uploadAttachment = require("../controllers/applicationFileController");
const router = express.Router();

router.post("/add", auth.authenticate, applicationController.createApplication);
router.get("/get", auth.authenticate, applicationController.getApplications);
router.put("/update/:id", auth.authenticate, applicationController.updateApplication);
router.delete("/delete/:id", auth.authenticate, applicationController.deleteApplication);

router.post("/:id/attachments",auth.authenticate,upload.single("file"),uploadAttachment.uploadAttachment);

router.get("/search", auth.authenticate, applicationController.searchApplications);
router.get("/filter", auth.authenticate, applicationController.filterApplications);

module.exports = router;
