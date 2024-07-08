const mongoose= require('mongoose');
const animal= new mongoose.Schema({
    title:{type:String, required:true},
    animal:{type:String, required:true},
    imageurl:{type:String, required:true},
    age:{type:Number, required:true},
    price:{type:Number, required:true},
    location:{type:String, required:true},
    gender:{type:String,enum:['male','female'], required:true},

})
module.exports = mongoose.model("Animal", animal);