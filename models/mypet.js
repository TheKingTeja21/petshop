const mongoose= require('mongoose');
const mypet= new mongoose.Schema({
    petname:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    image:{type:String},
    Bread:{type:String,required:true},
    category:{type:String,required:true},
    Gender:{type:String,required:true},
    quality:{type:String,required:true}

})

module.exports = mongoose.model("Mypet",mypet);