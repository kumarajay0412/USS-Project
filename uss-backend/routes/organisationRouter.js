const express = require("express");
const organisationRouter = express.Router();
const Organisation = require("../models/organisation");
const User = require("../models/user");
const authenticate = require("../middleware/authenticate");
const passport = require("passport");
organisationRouter.get("/", async (req, res) => {
  const allOrganisations = await Organisation.find({}).populate("users");
  res.json(allOrganisations);
});

organisationRouter.post("/create/:id", passport.authenticate("jwt"),
  authenticate.matchIdandJwt, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user.isSuperAdmin) {
      return res
        .status(403)
        .send({ message: "you are not a super admin, can't access this route" });
    }

    const organisation = new Organisation(req.body);
    await organisation.save();
    res.json(organisation);
  });

organisationRouter.post("/setadmin/:id", passport.authenticate("jwt"),
  authenticate.matchIdandJwt, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user.isSuperAdmin) {
      return res
        .status(403)
        .send({ message: "you are not a super admin, can't access this route" });
    }

    Organisation.findByIdAndUpdate(
      req.body.id,
      { $set: { admin: req.body.admin } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        res.json(doc);
      }
    );
  });

organisationRouter.get("/:id", async (req, res) => {
  const organisation = await Organisation.findById(req.params.id).populate(
    [{ path: 'members', strictPopulate: false }]
  );
  res.json(organisation);
});

organisationRouter.get("/:id/users", async (req, res) => {
  const organisation = await Organisation.findById(req.params.id).populate(
    [{ path: 'user', strictPopulate: false }]
  );
  console.log(organisation)
  res.json(organisation?.members);
});

organisationRouter.get("/:id/users/:userId", async (req, res) => {
  const organisation = await Organisation.findById(req.params.id).populate(
    [{ path: 'user', strictPopulate: false }]
  );
  const user = organisation.users.id(req.params.userId);
  res.json(user);
});

organisationRouter.get("/:id/removeUser", passport.authenticate("jwt"),
  authenticate.matchIdandJwt, async (req, res) => {
    const organisation = await Organisation.findById(
      req.body.organisationID
    ).populate([{ path: 'user', strictPopulate: false }]);
    if (organisation.admin.toString() !== req.params.id) {
      return res
        .status(403)
        .send({ message: "you are not an admin, can't access this route" });
    }
    const user = organisation.users.id(req.body.userID);
    user.organisation = undefined;
    await user.save();
    organisation.users.pull(user);
    await organisation.save();
    res.json(organisation);
  });

organisationRouter.post("/:id/addUser", passport.authenticate("jwt"),
  authenticate.matchIdandJwt, async (req, res) => {
    console.log(req.body)
    const organisation = await Organisation.findById(
      req.body.organisationID
    ).populate([{ path: 'user', strictPopulate: false }]);

    if (organisation.admin.toString() !== req.params.id) {
      return res
        .status(403)
        .send({ message: "you are not an admin, can't access this route" });
    }
    console.log(organisation);

    organisation.members.push(req.body.userID);
    await organisation.save();
    res.json(organisation);
  });
module.exports = organisationRouter;
