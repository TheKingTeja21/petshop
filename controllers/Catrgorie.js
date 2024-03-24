const { response } = require('express')
const Category=require('../models/Categories')

 module.exports={
    createCategory: async(req,res)=>{
        const NewCategory =new Category(req.body)
        try {
            await NewCategory.save()
            res.status(200).json({message:"successfully created category"})
        } catch (error) {
            res.status(500).json(error.message)
            
        }
    },
    updateCategory:async(req,res)=>{
        const userId = req.params.id;
        const {title,Imageurl,value}=req.body;
        try{
            const updateCategory= await Category.findOneAndUpdate(id,{title:title,Imageurl:imageurl,value:value},{new:true})
            if(!updateCategory){
                return res.status(404).json({message:"category not found"});
            }
            res.status(200).json({staus:'updateCategory successfully', updateCategory})

        }
        catch(err){
            res.status(500).json(err)
        }
    },
    deleteCategory: async(req,res)=>{
        const id=req.params.id;
        try {
            const deletecategory= await Category.findById(id);
            if(!deletecategory){
                return res.status(404).json({message:"category not found"});
            }
            await Category.findByIdAndDelete(id)
            res.status(200).json({staus:'deleteCategory successfully'})

        } catch (error) {
            res.status(500).json({message:"category not found"});
            
        }
    },
    getAllCategory: async(req,res)=>{
        try {
            const category= await Category.find({},{__v:0});
            if(!category){
                res.status(404).json({message:"categorys not found"});
            }
            console.log("hwllo",category);
            // const {createdAT,updatedAt,...categoryitems}=category._doc
            res.status(200).json(category);
            

        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    patchimage: async(req,res)=>{
        const id=req.params.id;
        const imageurl=req.body;
        try {
            const exstingcategory=await Category.find(id)
            const Updateimage=await Category.update({
                title:exstingcategory.title,
                value:exstingcategory.value,
                imageurl:imageurl
            })
            await Updateimage.save();
            res.status(200).json("updateimage successfully")

        } catch (error) {
            res.status(500).json({status:"false"});
            
        }
    },
    getRandomCategory: async(req,res)=>{
        try{
            let randomcategorys= await Category.aggregate([
                {$match:{value:{$ne:'more'}}},
                {$sample:{size:7}}

            ]);
            const morecategory = await Category.findOne({value:'more'})
            if(morecategory){
                randomcategorys.push(morecategory)
            res.status(200).json(randomcategorys)            }
        }
        catch (error) {
            res.status(500).json(error)
        }
    },
    getcategorybyId: async(req,res)=>{
        const categoryID = req.params.id
        try {
            const category = await Category.findById(categoryID)
            if(!category){
                return res.status(404).json({category:"category not found"})
            }
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json(error)
            
        }
    }
 }