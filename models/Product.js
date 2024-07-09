const mongoose = require("mongoose");
const {checkVideoDuration}=require('./appointment')
const Productschema = new mongoose.Schema(
  {
    petsshop: { type: mongoose.Schema.Types.ObjectId, ref: "Animalsshop" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageurl: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length > 0 && v.length <= 4;
        },
        message: props => `You can upload between 1 and 4 images, but you provided ${props.value.length}!`
      },
      required: true,
    },
    Breeder_Name: { type: String, required: true },
    Contact_Number: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 10-digit number!`,
      },
      required: true,
    },
    Breed_name: { type: String, required: true },
    quality: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    petParentsMatingVideo: {  type: String,
      required: true,
      validate: {
        validator: async function (v) {
          if (v.endsWith(".mp4")) {
            try {
              return await checkVideoDuration(v);
            } catch (error) {
              return false;
            }
          }
          return true;
        },
        message: () => `Video duration must not be more than 10 seconds!`,
      }, },
    Breed_lineage: { type: String, required: true },
    Address: { type: String, required: true },
    Gender: { type: String, required: true },
    availablility_details: {  type: Boolean, required: true, default: false },
    location: { type: String, required: true },
    age: { type: Number, required: true },
    vaccination: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Productschema);
