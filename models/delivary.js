const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mobileNumber: { type: String, required: true },
  houseType: {
    type: String,
    enum: ["flat", "house", "building", "apartment"],
    required: true,
  },
  area: { type: String, required: true },
  street: { type: String, required: true },
  landmark: { type: String, required: true },
  village: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
