const express = require("express");
const otpRouter = express.Router();
var CryptoJS = require("crypto-js");
const sendOTP = require("../utils/mailer");



const createOTP = (email) => {
    console.log(email)
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expires = Date.now() + 300000; // 5 minutes (ms)
    const data = `${email}.${otp}.${expires}`; // email.otp.expiry_timestamp
    console.log("Fkfkfkfkkf", otp, process.env.SECRET_KEY)

    const hash = CryptoJS.HmacSHA256(data, 'sfdfddfdjbfjbsbjdjfbsdbfkdsbkfbksdbfjkdbskkf');
    const fullHash = `${hash}.${expires}`; // hash.expiry_timestamp

    return { otp, fullHash };
};

const verifyOTP = (email, otp, hash) => {
    let [hashValue, expires] = hash.split(".");
    let now = Date.now();
    if (now > parseInt(expires)) return false;
    let data = `${email}.${otp}.${expires}`;
    let newHash = CryptoJS.HmacSHA256(data, 'sfdfddfdjbfjbsbjdjfbsdbfkdsbkfbksdbfjkdbskkf').toString();
    if (newHash === hashValue) {
        return true;
    }
    return false;
};


otpRouter.post("/send", async (req, res) => {
    console.log(req.body)
    try {
        const { email } = req.body;
        console.log(email)

        if (!email) return res.status(400).json({ message: "Invalid Request" });
        const { otp, fullHash } = createOTP(email);
        console.log(email, otp, fullHash)
        await sendOTP(email, otp);
        res.status(200).json({ message: "OTP sent to email", hash: fullHash });
    } catch (err) {
        console.log(err?.response?.body);
        res.status(400).json({ message: "OTP not sent" });
    }
});

otpRouter.post("/verify", async (req, res) => {
    const { email, otp, hash } = req.body;
    if (!email || !otp || !hash)
        return res.status(400).json({ message: "Invalid request" });
    const isVerified = verifyOTP(email, otp, hash);
    if (isVerified) {
        // const token = await issueJWT();
        res
            .status(200)
            .json({ message: "OTP verified", verified: true, jwt: "token" });
    } else {
        res.status(401).json({ message: "Invalid OTP" });
    }
});

module.exports = otpRouter;