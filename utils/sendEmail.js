const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async (to, subject, text) => {
  const sender = {
    email: process.env.EMAIL_FROM,
    name: "Job Reminder App"
  };
   console.log(to)
  const receivers = [
    {
      email: to
    }
  ];

  try {
    const data = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      textContent: text
    });

    console.log("Email sent successfully:", data.messageId);
  } catch (error) {
    console.error("Brevo error:", error.response?.body || error.message);
    throw error;
  }
};

module.exports = sendEmail;
