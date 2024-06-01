const mongoose = require("mongoose");
const Productschema = new mongoose.Schema(
  {
    petsshop: { type: mongoose.Schema.Types.ObjectId, ref: "Animalsshop" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageurl: { type: String, required: true },
    bread_description: { type: String, required: true },
    Contact_details: { type: String, required: true },
    Bread: { type: Array, required: true },
    quality: { type: String, default: 1 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    Bread_lineage: { type: String, required: true },
    shopAddress: { type: String, required: true },
    Nails: { type: Number, min: 18, max: 24, required: true },
    Gender: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Productschema);
