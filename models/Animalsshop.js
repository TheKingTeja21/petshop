const mongoose = require("mongoose");
const Animalsshop = new mongoose.Schema({
    title:{type:String,required:true},
    time:{type:String,required:true},
    imageUrl:{type:String,required:true},
    animals:{type:Array},
    owner:{type:mongoose.Schema.Types.Object, ref:'User'},
    isAvailable:{type:Boolean,default:"true"},
    pickup:{type:String,required:false,default:true},
    delivery:{type:String,required:false,default:true},
    code:{type:String,required:true},
    logoUrl:{type:String,required:true,default:"https://www.freepik.com/free-vector/bird-colorful-logo-gradient-vector_28267842.htm#query=logo&position=11&from_view=keyword&track=sph&uuid=a9344741-9baf-4fbc-b57f-79a4f948d64a"},
    rating:{type:Number,min:1,max:5},
    ratingcount:{type:String},
    coords:{
        id:{type:String,required:true},
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        latitudeDelta:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String,required:true},
        title:{type:String,required:true}
    }


    

},{ timestamps: true });

module.exports = mongoose.model("Animalashop", Animalsshop);
