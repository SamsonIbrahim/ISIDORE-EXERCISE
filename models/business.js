const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Business name is required!"],
    },
    email: {
      type: String,
      required: [true, "Business email is required!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Business phone number is required!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Business = mongoose.model("business", BusinessSchema);
