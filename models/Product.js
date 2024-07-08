const mongoose = require("mongoose");
const Productschema = new mongoose.Schema(
  {
    petsshop: { type: mongoose.Schema.Types.ObjectId, ref: "Animalsshop" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageurl: { type: String, required: true },
    Breader_details: { type: String, required: true },
    Contact_details: { type: String, required: true },
    Bread_name: { type: String, required: true },
    quality: { type: String,required: true },
    price: { type: Number, required: true },  
    category: { type: String, required: true },
    petParentsMatingVideo: { type: String, required: false},
    Bread_lineage: { type: String, required: true },
    Address: { type: String, required: true },
    Gender: { type: String, required: true },
    available: { type: String, required: true},
    location: { type: String, required: true},
    age: { type: String,enum:['male','female'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Productschema);
