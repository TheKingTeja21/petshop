const mongoose = require('mongoose');
const Broding=  new mongoose.Schema({
    Shopname:{type:String,required:true},
    Owner_name:{type:String,required:true},
    Working_timeings:{type:String,required:true},
    Address:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    phonenumber:{type:Number,required:true},
    Category:{type:Array,required:true},
    Bread:{type:Array,required:true},
    Rate:{type:Array,required:true},

},{timestamps:true})
module.exports = mongoose.model("Broding", Broding);