const mongoose= require('mongoose');
const Accessories= new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    imageurl:{type:String,required:true},
    category:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    quantity:{type:Number,required:true},
    company:{type:String,required:true},
},{ timestamps: true });

module.exports = mongoose.model("Accessories", Accessories);