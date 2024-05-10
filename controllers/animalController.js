const Animal= require("../models/animal")

module.exports ={
    addanima:async(req,res)=>{
        const newanimal = new Animal(req.body);
        try {
          await newanimal.save();
          res.status(200).json("product created sucullfull");
        } catch (error) {     
          res.status(500).json(error.message);
        }
    },
    getallanmals:async(req,res)=>{
        try {
            const allanimals= await Animal.find()
            if(allanimals.length ===0 || !allanimals){
                return res.status(404).json("not found")
            }
            res.status(200).json(allanimals);
        } catch (error) {
            res.status(500).json(error) 
            
        }
    }
}