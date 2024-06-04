const mongoose= require('mongoose');
const Aboutpet= new mongoose.Schema({
    image: {type: Array,required: true},
    Bread:{type: String,required: true},
    details:{type: String,required: true},
    Group: {type: String,required: true},
    Category: {type: String,required: true},
    Height:{type: String,required: true},
    Weight:{type: String,required: true},
    Life_span:{type: String,required: true},
    Characteristic: {type: String,required: true}
})
module.exports = mongoose.model("Aboutpet",Aboutpet );