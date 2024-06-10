const mongoose = require('mongoose');
const Crossing=  new mongoose.Schema({
    Category:{type:String,required:true},
    Bread_name:{type:String,required:true},
    Quality:{type:String,required:true},
    imageurl:{type:String,required:true},
    mating_video:{type:String,required:true},
    Bread_detais:{type:String,required:true},
    aadhar_Number:{type:Number,required:true},
    Address:{type:String,required:true},
    Contact_details:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
},{timestamps:true})

module.exports = mongoose.model("Crossing", Crossing);