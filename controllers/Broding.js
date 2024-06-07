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
    }

}