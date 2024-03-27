const mongoose = require('mongoose');
const Crossing=  new mongoose.Schema({
    name:{type:String, required:true},
    nails:{type:Number, required:true},
    Color:{type:String, required:   true},
    Gender:{type:String, required:true},
    Category:{type:mongoose.Schema.Types.ObjectId, ref:"Category"},
    imageurl:{type:String, required:true},
    Age:{type:String,required:true},
    description:{type:String, required:true},
    Fathername:{type:String, required:true},
    Mothername:{type:String, required:true}
},{timestamps:true})

module.exports = mongoose.model("Crossing", Crossing);