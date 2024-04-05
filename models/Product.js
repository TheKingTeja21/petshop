const mongoose = require("mongoose");
const Productschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    petsshop: { type: mongoose.Schema.Types.ObjectId, ref: "Animalsshop" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageurl: { type:String,required: true },
    description: { type: String, required: true },
    Bread: { type: Array, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    petTags: { type: Array, required: true },
    isAvailable: { type: Boolean, default: false, required: true },
    Rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    shopAddress: { type: String, required: true },
    Days: { type: Number, required: true },
    Year: { type: Number, required: true },
    month: { type: Number, required: true },
    Nails: { type: Number, min: 18, max: 24, required: true },
    color: { type: String, required: true },
    eyeColor: { type: String, required: true },
    Gender: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Productschema);
