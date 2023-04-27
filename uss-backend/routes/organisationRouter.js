const express = require("express");
const organisationRouter = express.Router();
const Organisation = require("../models/organisation");
const User = require("../models/user");
const authenticate = require("../middleware/authenticate");
const passport = require("passport");
const CryptoJS = require('crypto-js');
const { uuid } = require('uuidv4');

organisationRouter.get("/", async (req, res) => {
  const allOrganisations = await Organisation.find({}).populate("members");
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

    const organisation = await Organisation.findById(req.body.id);

    if (!organisation) {
      return res.status(404).send({ message: "organisation not found" });
    }
    const newAdmin = await User.findById(req.body.admin);
    // const newAdmin = organisation.members.find(member => member._id == req.body.admin);

    if (!newAdmin) {
      return res.status(404).send({ message: "new admin not found" });
    }

    newAdmin.isAdmin = true;
    newAdmin.organisation = req.body.id;
    organisation.admin = req.body.admin;
    organisation.members.push(newAdmin);
    await newAdmin.save();
    await organisation.save();
    res.json(organisation);
  });

organisationRouter.get("/:id", async (req, res) => {
  const organisation = await Organisation.findById(req.params.id).populate(
    [{ path: 'members', strictPopulate: false }]
  );
  res.json(organisation);
});

organisationRouter.get("/:id/users", async (req, res) => {
  const organisation = await Organisation.findById(req.params.id).populate(
    [{ path: 'members', strictPopulate: false }]
  );
  res.json(organisation?.members);
});

organisationRouter.get("/:id/users/:userId", async (req, res) => {
  const organisation = await Organisation.findById(req.params.id).populate(
    [{ path: 'members', strictPopulate: false }]
  );
  const user = organisation.users.id(req.params.userId);
  res.json(user);
});

organisationRouter.post("/:id/removeUser", passport.authenticate("jwt"),
  authenticate.matchIdandJwt, async (req, res) => {
    const organisation = await Organisation.findById(req.body.organisationID).populate("members");
    if (!organisation) {
      return res.status(404).send({ message: "Organisation not found" });
    }
    if (organisation.admin.toString() !== req.params.id) {
      return res.status(403).send({ message: "You are not an admin, can't access this route" });
    }
    const user = await User.findById(req.body.userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await User.findByIdAndDelete(user);

    organisation.members.pull(user);

    // console.log(user, organisation)
    // await user.save();
    // await organisation.save();
    res.json(organisation);
  });


organisationRouter.post("/:id/addUser", passport.authenticate("jwt"),
  authenticate.matchIdandJwt, async (req, res) => {
    const organisation = await Organisation.findById(
      req.body.organisationID
    ).populate([{ path: 'members', strictPopulate: false }]);

    if (organisation.admin.toString() !== req.params.id) {
      return res
        .status(403)
        .send({ message: "you are not an admin, can't access this route" });
    }

    const userr = await User.findById(req.body.userID);
    // const newAdmin = organisation.members.find(member => member._id == req.body.admin);
    userr.organisation = req.body.organisationID;
    if (!userr) {
      return res.status(404).send({ message: "user not found" });
    }

    organisation.members.push(userr);
    await organisation.save();
    await userr.save();
    res.json(organisation);
  });



organisationRouter.get("/content/:id/:userID", passport.authenticate("jwt"), async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id).populate(
      [{ path: 'members', strictPopulate: false }]
    );
    const user = await User.findById(req.params.userID);
    const { organisation: userOrg } = user;

    if (organisation._id.toString() !== userOrg.toString()) {
      return res.status(403).send({ message: "You are not authorized to access this content" });
    }
    console.log(organisation._id.toString() !== userOrg.toString(), userOrg.toString())

    const content = organisation.description;
    const decryptedContent = decryptContent(content, userOrg.toString());

    res.json(decryptedContent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to get content" });
  }
});

organisationRouter.post("/content/:id/:userID", passport.authenticate("jwt"), async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id).populate(
      [{ path: 'members', strictPopulate: false }]
    );
    const user = await User.findById(req.params.userID);
    const { organisation: userOrg } = user;

    if (organisation._id.toString() !== userOrg.toString()) {
      return res.status(403).send({ message: "You are not authorized to create content for this organisation" });
    }

    const { data } = req.body;
    const encryptedContent = encryptContent(data, organisation._id.toString());
    console.log(encryptedContent)
    organisation.description = encryptedContent;
    await organisation.save();

    res.status(201).send({ message: "Content created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create content" });
  }
});

function encryptContent(data, secretKey) {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
  // console.log(data, members, secretKey)
  // const encryptedData = crypto.AES.encrypt(JSON.stringify(data), secretKey).toString();
  // const uuidId = uuid();
  // console.log(encryptedData, uuidId)
  // const encryptedKeys = members.map(member => {
  //   const key = crypto.randomBytes(32).toString("hex");
  //   const encryptedKey = crypto.publicEncrypt(member.publicKey, Buffer.from(key)).toString("hex");
  //   return { userId: member._id, encryptedKey };
  // });
  // return { uuidId, encryptedData, encryptedKeys };
}

function decryptContent(encryptedData, secretKey) {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
  // const { encryptedData, encryptedKeys, uuid } = content;
  // const keyPair = encryptedKeys.find(keyPair => keyPair.userId.toString() === req.user.id.toString());

  // if (!keyPair) {
  //   throw new Error("You are not authorized to access this content");
  // }

  // const { encryptedKey } = keyPair;
  // const key = crypto.privateDecrypt(secretKey, Buffer.from(encryptedKey, "hex")).toString("hex");
  // const decryptedData = crypto.AES.decrypt(encryptedData, key).toString(crypto.enc.Utf8);

  // return { uuid, data: JSON.parse(decryptedData) };
}



module.exports = organisationRouter;
