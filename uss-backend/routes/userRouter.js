const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const passport = require("passport");
userRouter.post(
  "/create/:id",
  passport.authenticate("jwt"),
  authenticate.matchIdandJwt,
  async (req, res) => {
    User.findById(req.params.id).exec(async (err, userOut) => {
      if (err) {
        return res.status(400).send({ message: "some error occured in db" });
      }
      if (!userOut.isAdmin && !userOut.isSuperAdmin) {
        return res
          .status(403)
          .send({ message: "you are not an admin, can't access this route" });
      }
      const { name, email, password, gender, role, isAdmin, organisation } =
        req.body;
      let hashedPassword;
      try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      } catch (error) {
        console.log("Password is not hashed");
        return res
          .status(400)
          .send("Something Went Wrong Please Try Again Later");
      }

      const user = new User({
        name,
        email,
        password,
        role,
        isAdmin,
        organisation,
        gender,
        password: hashedPassword,
      });

      let checkUser;

      try {
        checkUser = await User.findOne({ email });
      } catch (error) {
        //   console.log("ertyu")
        return res.status(400).send("something went wrong");
      }
      if (checkUser) {
        return res
          .status(400)
          .json({ error: "user already exist.Go and log In" });
      }
      try {
        await user.save();
      } catch (error) {
        const err = new Error("could not sign up try again");
        return res.status(400).json({ error: "server error" });
      }
      res.json({
        user: user._id,
      });
    });
  }
);

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return res.status(400).send("something went wrong");
  }
  if (!existingUser) {
    return res.status(400).send("Employer does not exist please sign up first");
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email passsword combination");
  }
  //creating token
  try {
    const token = authenticate.getToken({ _id: existingUser._id });
    res.header("auth_token", token).json({
      auth_token: token,
      user: existingUser,
    });
  } catch (error) {
    return res.status(400).send("something went fgh");
  }
});

module.exports = userRouter;
