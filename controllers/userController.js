const User = require("../models/User");

module.exports ={
    deleteUser :async(req,res) =>{
        const userId= req.user.id;
       try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({message : "User deleted successfully"});
        
       } catch (error) {
        res.status(500).json(error.message);
       }
    },
    getUser :async(req, res) =>{
        const userId = req.user.id 
        try {
            const user = await User.findById({_id:userId},{password: 0,__v:0,createdAt:0,updatedAt:0});
        if(!user){
            res.status(404).json({message : "User not found"});
        }
        const { password, __v, createdAt, ...userData } = user._doc;
        res.status(200).json({message : "User found",...userData});
            
        } catch (error) {
            res.status(500).json(error.message);
            
        }

    },
    updateUser:async(req, res) =>{
        const userId = req.user.id;
        try {
            const user= await User.findByIdAndUpdate(userId,{
                $set:req.body,
            },{new:true})
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error.message);
            
        }
    }
}