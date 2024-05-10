const mongoose= require('mongoose');
const animal= new mongoose.Schema({
    title:{type:String, required:true},
    animal:{type:String, required:true},
    imageurl:{type:String, required:true},

})
module.exports = mongoose.model("Animal", animal);