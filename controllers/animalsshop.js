const Animalsshop =require("../models/Animalsshop")
module.exports={
    addanimalshop:async(req,res) =>{
        const newanimalshop= new Animalsshop(req.body)
        try {
            await newanimalshop.save();
            res.status(200).json({meassage:'successful registration completed'});
        } catch (error) {
            res.status(500).json(error)
            
        }
    }, serviceAvalibility:async(req, res) =>{
        const animalshopId = req.params.id;
        try {
            const animalshop = await Animalsshop.findById(animalshopId)
            if(!animalshop){
                res.status(404).json({meassage:'Shop not found'});
            }
            animalshop.isAvailable=!animalshop.isAvailable
            await Animalsshop.save();
            res.status(200).json({message:'animals shop found',isAvailable:animalshop.isAvailable});
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    deleteanimalshop:async(req,res)=>{
        const animalshopId = req.params.id;
        try {
            const animalshop = await Animalsshop.findById(animalshopId)
            if(!animalshop){
                res.status(404).json({meassage:'Shop not found'});
            }
            await Animalsshop.findByIdAndDelete(animalshop)
            res.status(200).json({message:'delete succufully'});
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    getanimalshop:async(req,res)=>{
        const animalshopId = req.params.id;
        try {
            const animalshop = await Animalsshop.find({owner:animalshopId})
            console.log(animalshop);
            if(!animalshop){
                res.status(404).json({meassage:'Shop not found'});
            }
            res.status(200).json(animalshop);
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    getRandomanimalshop:async(req,res)=>{
       let data=[]
       try {
        if(req.params.code){
            data= await Animalsshop.aggregate([{$match:{code:req.params.code}},
            {$sample:{size:5}},
        {$project:{__v:0}},
     ])}

        if(!data.length){
            data= await Animalsshop.aggregate([
            {$sample:{size:5}},
        {$project:{__v:0}},
     ])}
     if(data){
        res.status(200).json(data)
     }


    }
        catch (error) {
        res.status(500).json(error.meassage)
       }
    }
}