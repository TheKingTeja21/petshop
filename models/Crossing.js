const mongoose = require('mongoose');
const Crossing=  new mongoose.Schema({
    Category:{type:String,required:true},
    Breed_name:{type:String,required:true},
    Gender:{type:String,required:true},
    Quality:{type:String,required:true},
    imageurl:{type:String,required:true},
    mating_video:{type:String,required:true},
    Breeder_Name:{type:String,required:true},
    aadhar_Number:{type:Number,required:true},
    Address:{type:String,required:true},
    Contact_Number:{type:String,required:true},
    location:{type:String,required:true},
    age:{type:Number,required:true},
    Breed_Leanage:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:"User" }
},{timestamps:true})

module.exports = mongoose.model("Crossing", Crossing);