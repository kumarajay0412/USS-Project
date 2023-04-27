const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendOTP(email, otp) {

  return new Promise((resolve, reject) => {
    const msg = {
      to: email,
      from: process.env.SENDGRID_EMAIL_ID,
      subject: "OTP for verification | TrustVault",
      html: `OTP for verifcation : <b>${otp}</b>`,
    };
    sgMail
      .send(msg)
      .then((ok) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = sendOTP;
