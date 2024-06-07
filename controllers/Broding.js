const Broding =require("../models/Bording")

module.exports = {
    createbroding:async (req,res)=>{
        const newBroding = new Broding(req.body)
        if(!newBroding)
            return res.status(500).json("error")
        try {
            await newBroding.save()
            res.status(200).json("success")
        } catch (error) {
            res.status(500).json(error.message)
            
        }
    },
    getallbroding:async (req,res)=>{
        try {
            const allbroding= await Broding.find()
            if(!allbroding){
                return res.status(500).json("not found")
            }
            res.status(200).json(allbroding)
        } catch (error) {
            res.status(500).json(error.message)
            
        }
    }

}