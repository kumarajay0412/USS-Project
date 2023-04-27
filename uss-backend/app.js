const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv/config");
const userRouter = require("./routes/userRouter");
const organisationRouter = require("./routes/organisationRouter");
const otpRouter = require("./routes/otpRouter");
const db = process.env.MONGO_CONNECTION_URL;

const options = {
  user: process.env.MONGO_ID,
  pass: process.env.MONGO_PASSWORD,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
};
const connect = mongoose.connect(db, options);
connect
  .then((db) => {
    console.log("Connection to db successful");
  })
  .catch((err) => {
    console.log("Unable to connect to the db. error: " + err);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/user", userRouter);
app.use("/organisation", organisationRouter);
app.use("/otp", otpRouter);

// 404 handler

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Currently Connected to port ${PORT}`);
});