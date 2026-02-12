const s3 = require("../utils/s3");
const Application_files = require("../models/application_files");
const JobApplication = require("../models/jobApplication");

const uploadAttachment = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const application = await JobApplication.findOne({
      where: { id: jobId, userId: req.user.id }
    });

    if (!application) {
      return res.status(404).json({
        message: "Job application not found or unauthorized"
      });
    }

    const cleanFileName = req.file.originalname.replace(/\s+/g, "_");

    const key = `applications/${jobId}/${Date.now()}-${cleanFileName}`;

    await s3.upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }).promise();

    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    const attachment = await Application_files.create({
      JobApplicationId: jobId,
      fileUrl: publicUrl
    });

    return res.status(201).json({
      message: "File uploaded successfully",
      fileUrl: publicUrl,
      attachment
    });

  } catch (err) {
    return res.status(500).json({
      message: "S3 upload failed",
      error: err.message
    });
  }
};

module.exports = { uploadAttachment };
