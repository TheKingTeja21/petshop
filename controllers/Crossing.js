const Crossing= require("../models/Crossing");
module.exports={
    createCrossingpeet: async(req,res)=>{
        const newCrossing = new Crossing(req.body);
    try {
      await newCrossing.save();
      res.status(200).json("sucullfully added Your pet");
    } catch (error) {     
      res.status(500).json(error.message);
    }
    },
    getallCrossingpets: async(req,res)=>{
        try {
            const Crossingpets= await Crossing.find()
            if(!Crossingpets){
                return res.status(404).json("PETS not found");
            }
            res.status(200).json(Crossingpets)
        } catch (error) {
            res.status(500).json(error.message);
            
        }
    },
    changeimage: async(req,res)=>{
        const {name,nails,Color,Gender,imageurl,Age,description,Fathername,Mothername,phone}= req.body
        const Petid= req.params.user
        try {
            const existPet=await Crossing.findById(Petid)
            if(existPet) {
                const newpet = await new existPet   ({
                    name: name,
                    nails: nails,
                    Color: Color,
                    Gender: Gender,
                    imageurl: imageurl,
                    Age: Age,
                    description: description,
                    Fathername: Fathername,
                    Mothername: Mothername,
                    phone: phone,
                })
                await newpet.save()
            }
        } catch (error) {
            
        }
    
    },
    getCrossingPetasByID:async (req, res, next) => {
        const userId= req.params.id;
        try {
            const Crossingpets= await Crossing.find({userid: userId})
            if(!Crossingpets){
                return res.status(404).json("ADD YOURS PETS FOR CROSSING")
            }
            res.status(200).json(Crossingpets)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}