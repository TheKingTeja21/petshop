const mongoose= require('mongoose');
const vaccination= new mongoose.Schema({
    date:{type:Date, required:true},
    vaccinationProof:{type:String, required:true},
    age:{type:Number, required:true},
    gender:{type:String,enum:['male','female'], required:true},
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"}, 
    userId:{ type: mongoose.Schema.Types.ObjectId, ref:"User"}, 

})
module.exports = mongoose.model("Vaccination", vaccination);