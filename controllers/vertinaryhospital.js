const hospital= require("../models/vertinaryhospital")

module.exports={
    createhospital: async(req,res)=>{
        const newhospital = new hospital(req.body);
        try {
            await newhospital.save();
            res.status(200).json({message:"succcessful added"})
        } catch (error) {
            res.status(500).json(error)
        }
        

    },
    getHospitals:async(req, res)=>{
        const hospitalid = req.params.id;
        try {
            const Hospital= await hospital.findById(hospitalid)
            if(!Hospital){
                return res.status(404).json("not found hostpital")
            }
            res.status(200).json(Hospital)
        } catch (error) {
            res.status(500).json(error)
        } 


},
getallHospitals :async(req, res)=>{
    try {
        const hospitals= await hospital.find()
        if(!hospitals){
            return res.status(404).json("not found hostpital")
        }
        res.status(200).json(hospitals)
    } catch (error) {
        res.status(200).json(error)
        
    }
}
}