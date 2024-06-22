const mongoose = require('mongoose')
const Hospital = new mongoose.Schema({
    Hospital:{type:String,required:true},
    Doctor_name:{type:String,required:true},
    Address:{type:String,required:true},
    price:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User" },
    Hospital_image:{type:String,required:true},
    Working_time:{type:String,required:true},

})


module.exports = mongoose.model('Hospital', Hospital)