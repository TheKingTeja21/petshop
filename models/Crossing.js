const mongoose = require('mongoose');
const Crossing=  new mongoose.Schema({
    name:{type:String, required:true},
    Nails:{type:Number, required:true},
    Bread:{type:String, required:true},
    Color:{type:String, required:true},
    phone:{type:Number, required:true},
    Gender:{type:String, required:true},
    isAvialble:{type:Boolean, required:true},
    imageurl:{type:String, required:true},
    Age:{type:String,required:true},
    description:{type:String, required:true},
    FathertBread:{type:String, required:true},
    MotherBread:{type:String, required:true},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
},{timestamps:true})

module.exports = mongoose.model("Crossing", Crossing);