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
                $set:{
                    fullName:req.body.fullName,
                    address:req.body.address
                }
            },{new:true})
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error.message);
            
        }
    },
    changeProfile: async (req,res)=>{
        const userid = req.params.id
        const Imageurl = req.body
        try {
            const user= await User.findByIdAndUpdate(userid,Imageurl,{new:true, runValidators:true})
            console.log(user);
            if(!user){
                return res.status(404).json("user not found")
            }
            res.status(200).json(user)
            
        } catch (error) {
            return res.status(500).json(error)
            
        }
    },
    updateAdress : async (req, res)=>{
        const userid = req.params.id
        const adress = req.body
        try {
            const respone= await User.findByIdAndUpdate(userid,adress,{new:true, runValidators:true})
            if(!respone){
                return res.status(404).json("userNotFound")
            }
            res.status(200).json(respone)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}