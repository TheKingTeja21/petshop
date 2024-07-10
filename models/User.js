const mongoose = require("mongoose");
const Userschema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    uid: { type: String, required: true, unique: true },
     password: { type: String, required: true },
    //  fullName: { type: String, required: true, unique: true},
    address: {
      name: String,
      phone: String,
      HouseNo: String,
      Area: String,
      Landmark: String,
      Pincode: String,
      Towncity: String,
      State: String,
    },
    animalshp: { type: mongoose.Schema.Types.ObjectId, ref: "Animalashop" },
    aadhar_Number: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{12}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 12-digit Aadhar number!`,
      },
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 10-digit number!`,
      },
      required: true,
      unique: true,
    },
    userType: {
      type: String,
      default: "Client",
      enum: ["Admin", "Vendor", "Driver", "Client"],
    },
    profile: {
      type: String,
      default: "https://unsplash.com/photos/guy-fawkes-mask-VS2C5_GI_MM",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", Userschema);
