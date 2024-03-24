const accessories = require("../models/accessories")

module.exports ={
    createAccessories: async (req, res) => {
        const newproduct = new accessories(req.body);
        try {
          await newproduct.save();
          res.status(200).json("product created sucullfull");
        } catch (error) {     
          res.status(500).json(error.message);
        }
      },
      getallAccessories: async (req, res) => {
        try {
            const allProducts = await accessories.find().sort({ createdAt: -1 }); 
            res.status(200).json(allProducts);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    
      Accessorie: async (req, res) => {
        const Accessoriesid = req.params.id;
        console.log('====================================');
        console.log(Accessoriesid);
        console.log('====================================');
        try {
          const product = await accessories.findById(Accessoriesid);
          if(!product){
            return res.status(404).json("Not found Product")&& console.log(product.error);
            
          }
          res.status(200).json(product);
        } catch (error) {
          res.status(500).json(error.message);
        }
      },
      search: async (req, res) => {
        try {
          const results = await accessories.aggregate(
            [
              {
                $search: {
                  index: "default",
                  text: {
                    query: req.params.key,
                    path: {
                      wildcard: "*"
                    }
                  }
                }
              }
            ]
          );
          res.status(200).json(results);
        } catch (error) {
          res.status(500).json("failed to get the product");
        }
      },
      deleteProductById: async (req, res) => {
        const accessoriesId = req.params.id
        try {
          const product = await accessories.findByIdAndDelete(accessoriesId)
          if(!product){
            return res.status(404).json("product not found");
          }
          await Product.findByIdAndDelete(product)
          res.status(200).json("delete product successfully")
        } catch (error) {
          res.status(500).json("failed to delete the product");
          
        }
    
      },
      productAvailable: async (req,res)=>{
        const productId = req.params.id
        try {
    
          const product = await accessories.findById(productId)
          if(!product){
            return res.status(404).json("product not found");
          }
          product.foodAvailable = !product.foodAvailable
          await accessories.save()
          res.status(200).json("food available");
        } catch (error) {
          res.status(500).json('failed to change availability of the product');
        }
      },
      UpdateFoodId: async (req,res)=>{
        const productId = req.params.id;
        try {
          const updateProductId = await accessories.findByIdAndUpdate(productId,req.body,{new:true,runValidators:true}); 
          if(!updateProductId){
            return res.status(404).json("product not found");
          }
          await Product.save()
          res.status(200).json("product updated");
        } catch (error) {
          res.status(500).json('failed to update availability of the product');
        }
      },
      addFoodtags: async (req,res)=>{
        const productId =req.params.id;
        const {tag} =req.body
        try {
          const product= await accessories.findById(productId);
          if(!product){
            return res.status(404).json("product not found");
          }
          if(Product.foodtags.includes(tag)){
            return res.status(200).json({staus:false,message:'tag already exists'})
          }
          Product.foodtags.push(tag);
          await accessories.save();
          res.status(200).json('successfully added')
        } catch (error) {
          res.status(500).json({staus:false,message:'error saving tags'})
          
        }
      },
      gatRandomProductbycode: async (req,res)=>{
        try {
          const productId =await accessories.aggregate([
            {$match:{code:req.params.code}},
            {$sample:{size:5}},
            {$project:{_id:0}}
          ])
          res.status(200).json(productId)
        } catch (error) {
          res.status(500).json({staus:false,message:'error',error})
        }
    
      },
    
}