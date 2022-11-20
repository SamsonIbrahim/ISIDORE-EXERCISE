const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required!"],
    },
    email: {
      type: String,
      required: [true, "User email is required!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "User phone number is required!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", UserSchema);
