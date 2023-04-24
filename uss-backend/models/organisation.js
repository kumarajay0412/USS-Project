const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: Object,
    },
    logo: {
      type: String,
    },
    address: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Organisation = mongoose.model("Organisation", organisationSchema);

module.exports = Organisation;