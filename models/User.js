const mongoose = require("mongoose");
const Userschema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    uid:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    address:{type:Array, required:false},
    animalshp:{type:mongoose.Schema.Types.ObjectId, ref:"Animalashop"},
    phone:{type:Number,required:true,unique:true},
    userType:{type:String,default:"Client",enum:["Admin","Vendor","Driver","Client"]},
    profile:{type:String,default:"https://unsplash.com/photos/guy-fawkes-mask-VS2C5_GI_MM"}


    

},{ timestamps: true });

module.exports = mongoose.model("User", Userschema);
