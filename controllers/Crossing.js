const Bording = require("../models/Bording");
const Crossing= require("../models/Crossing");
let paymentStatus = {};
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
    getallCrossingpets: async (req, res) => {
        try {
          const { breed_name, gender, age } = req.query;
    
          let filters = {};
    
          if (breed_name) filters.breed_name = new RegExp(breed_name, 'i'); 
          if (gender) filters.gender = gender;
          if (age) filters.age = parseInt(age);
    
          const Crossingpets = await Crossing.find(filters);
          if (!Crossingpets || Crossingpets.length === 0) {
            return res.status(404).json("PETS not found");
          }
          res.status(200).json(Crossingpets);
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
    },
    updateCrossing:async (req, res) => {
        const Crossingid= req.params.id
        try {
            const crossing = await Crossing.findByIdAndUpdate(Crossingid, req.body,{new:true,runValidators:true});
            if(!crossing){
                return res.status(404).json("NOT FOUND PRODUCT")
            }
            
            res.status(201).json("Succcess fully Update")
        } catch (error) {
            res.status(500).json(error)
            
        }
    },
    deleteCrossing:async (req, res) => {
        const petid = req.params.id;
        try {
            const deleteCrossing= await Crossing.findByIdAndDelete(petid)
            if(!deleteCrossing){
                return res.status(404).json("NOT FOUND PRODUCT");
            }
            res.status(200).json("Succcessfully")
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    getCrossingDetails: async (req, res) => {
        const { id } = req.params; 
        const { userId } = req.body;

        try {
            const Crossing = await Crossing.findById(id);
            if (!Crossing) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const hasPaid = paymentStatus[userId] && paymentStatus[userId][id];

            if (hasPaid) {
     
                return res.status(200).json({ Crossing });
            } else {
              
                return res.status(200).json({
                    category: Crossing.category,
                    Breed_name: Crossing.Breed_name,
                    Gender: Crossing.Gender,
                    available: Crossing.available,
                    imageurl: Crossing.imageurl,
                    mating_video: Crossing.mating_video,
                    Quality: Crossing.Quality,
                    Breed_Leanage: Crossing.Breed_Leanage,
                    age:Crossing.age,
                    price: Crossing.price,
                    vaccination:Crossing.vaccination,
                    location: Crossing.location
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    makePayment: async (req, res) => {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'User ID and Product ID are required' });
        }

        if (!paymentStatus[userId]) {
            paymentStatus[userId] = {};
        }
        paymentStatus[userId][productId] = true;

        res.status(200).json({ message: 'Payment successful' });
    }

}