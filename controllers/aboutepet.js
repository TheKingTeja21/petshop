const aboutepet = require("../models/aboutepets")

module.exports ={
    createaboute:async(req,res)=>{
        const Aboutepet = new aboutepet(req.body);
        try {
          await Aboutepet.save();
          res.status(200).json("product created sucullfull");
        } catch (error) {     
          res.status(500).json(error.message);
        }
    },
    getallDog:async(req,res)=>{
      try {
        const Dogdetails = await aboutepet.find({Category:"dog"})
        if(!Dogdetails) {
          return res.status(404).json("product not found");
        }
        res.status(200).json(Dogdetails)
      } catch (error) {
        res.status(500).json(error.message);
        
      }
    }
}