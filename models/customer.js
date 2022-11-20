const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required!"],
    },
    email: {
      type: String,
      required: [true, "Customer email is required!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Customer phone number is required!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Customer = mongoose.model("customer", CustomerSchema);
