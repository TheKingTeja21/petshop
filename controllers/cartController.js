const Product = require("../models/Product");
const Cart = require("../models/Cart");

module.exports = {
  addtoCart: async (req, res) => {
    const userId = req.params.id;
    const ProductId = req.body.ProductId;
    const totalprice = req.body.totalprice;
    const quantity = req.body.quantity;
    let count;
    try {
      const existingProduct = await Cart.findOne({ userId, ProductId })
      //const product = await Product.findById(ProductId);
      //console.log(product);
      count = await Cart.countDocuments({ userId });
      if (existingProduct) {
        
        // existingProduct.ProductId.map((id,index)=>{
        //   console.log(index);
        //   const prodid= existingProduct.ProductId[index]._id
        //   console.log(existingProduct.ProductId[index].quantity);
          
        //   if(JSON.stringify(prodid) !== JSON.stringify(ProductId)) {
        //     console.log("lkbsaLSDNL");
        //     existingProduct.ProductId.push(ProductId);
        //   }

        //   if(JSON.stringify(prodid) === JSON.stringify(ProductId)){
        //     existingProduct.ProductId[index].quantity+=1
            
        //     console.log(existingProduct.ProductId[index].quantity);
        //     existingProduct.save();
        //   }
        // })
        console.log(totalprice);
        existingProduct.totalprice= existingProduct.totalprice + totalprice;
        existingProduct.quantity += 1;
        // existingProduct.ProductId[1].quantity+=1;
        // await existingcart.save();
        await existingProduct.save();
      } else {
        const existingcart = await Cart.findOne({ userId });
        const quantity = req.body.quantity;
        const totalvalue = req.body.totalprice;
        const producctid = req.body.ProductId;
        const newCart = new Cart({
          userId: userId,
          ProductId: producctid,
          totalprice: totalvalue,
          quantity: req.body.quantity,
        });
        await newCart.save();

        count = await Cart.countDocuments({ userId });
      }
      res.status(200).json({ message: "Success", count: count });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  removeProductfromCart: async (req, res) => {
     const userId = req.body.userid
    const itemId = req.params.id;
    console.log(userId);
    try {
      const cart =await Cart.findByIdAndDelete(itemId);
      console.log(cart);
      if (!cart) {
        return res.status(200).json("cart NOt found");
      }
      
      let count = await Cart.countDocuments({ userId });
      res.status(200).json({ count: count });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  fetchuserCart: async (req, res) => {
    const userid = req.params.id;
    try {
      const Usercart = await Cart.find({ userId: userid }).populate({
        path: "ProductId",
        select: "name price quantity imageurl ",
      });
      console.log(Usercart);
      res.status(200).json(Usercart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  clearUsercart: async (req, res) => {
    const userid = req.params.id;
    try {
      await Cart.deleteMany({ userId: userid });
      let count = await Cart.countDocuments({ userid });

      res.status(200).json({ count: count, message: "succefull" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getCartcount: async (req, res) => {
    const userid = req.params.id;
    let count;
    try {
      count = await Cart.countDocuments({ userid });
      res.status(200).json({ count: count });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  decrementProductQty: async (req, res) => {
    const userId = req.params.id;
    const { Productid, totalprice } = req.body;
    let count;
    try {
      const existingProduct = await Cart.findOne({ userId:userId, ProductId:Productid });
      count = await Cart.countDocuments({ userId });
      console.log(existingProduct);
      if (existingProduct.quantity > 1) {
        (existingProduct.quantity -= 1),
          (existingProduct.totalprice -= totalprice),
          await existingProduct.save();
      } else {
        await Cart.findByIdAndDelete({ _id: itemId });
        let count = await Cart.countDocuments({ userId });
        return res.status(200).json({ count: count });
      }
      res.status(200).json({ message: "Success", count: count });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
