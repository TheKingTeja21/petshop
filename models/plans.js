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
 
},{versionkey:false,timeStamp:true});

module.exports = mongoose.model("Plan", PlanSchema);
