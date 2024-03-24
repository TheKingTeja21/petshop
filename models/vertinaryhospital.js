const mongoose= require('mongoose')

const vertinaryhospital= new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String, required:true},
    imageurl:{type:String, required:true},

},{timestamps:true});

module.exports =mongoose.model("Vertinaryhostpital",vertinaryhospital);