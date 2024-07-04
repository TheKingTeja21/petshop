const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true, 
     unique: true 
    },
  price: { 
    type: Number, 
    required: true 
    },
  features: [String],
  allowedFunctionalities: { // new field
    type: Number,
    required: true
  }
},{versionKey: false, timestamps: true});

module.exports = mongoose.model("Plan", PlanSchema);
