const hospital= require("../models/Hospital")

module.exports={
    createHospital: async (req, res) => {
        const newHospital = new hospital(req.body)
        try {
          const newhospital = await hospital.create(newHospital);
          await newhospital.save()
          res.status(200).json("you successfully created");
        } catch (error) {
          res.status(500).json(error.message);
        }
      },
    getHospital: async (req, res) => {
        const userId = req.params.id
        try {
            const hospital_details = await hospital.find({userId: userId}) 
            if(!hospital_details)
                return res.status(404).json("you cannot find")
        
         res.status(200).json(hospital_details)
        } catch (error) {
            res.status(500).json(error.message);
            
        }
    }
    
    
    }