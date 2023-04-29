const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: 'ajaykumar04122000@gmail.com',
    pass: 'shovikaxqiptwihy',
  },
  secure: true,
});

function sendOTP(email, otp) {

  return new Promise((resolve, reject) => {
    const msg = {
      to: email,
      from: process.env.SENDGRID_EMAIL_ID,
      subject: "OTP for verification | TrustVault",
      html: `OTP for verifcation : <b>${otp}</b>`,
    };
    transporter
      .sendMail(msg)
      .then((ok) => {
        resolve(true);
      })
      .catch((err) => {
        console.log("err", err);
        reject(err);
      });
  });
}

module.exports = sendOTP;
