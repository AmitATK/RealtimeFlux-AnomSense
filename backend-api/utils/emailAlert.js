const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_EMAIL_PASSWORD,
  },
});

async function sendAlertEmail(subject, message) {
  await transporter.sendMail({
    from: `"System Monitor Alert" <${process.env.ALERT_EMAIL}>`,
    to: process.env.ALERT_RECEIVER,
    subject,
    text: message,
  });
  console.log("Alert Email Sent");
}

module.exports = sendAlertEmail;
