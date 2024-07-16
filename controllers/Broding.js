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
    },
    updateBroding: async (req, res) => {
        const { id } = req.query;
        const { Breed, Rate } = req.body;

        if (!Bread && !Rate) {
            return res.status(400).json("No fields to update");
        }

        try {
            const updatedBroding = await Broding.findOneAndUpdate(
               {userid:id},
                { $set: { Breed, Rate } },
                { new: true }
            );

            if (!updatedBroding) {
                return res.status(404).json("Broding not found");
            }

            res.status(200).json(updatedBroding);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

}