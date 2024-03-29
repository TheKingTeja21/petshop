const Product = require("../models/Product");
const Cart = require("../models/Cart");

module.exports = {
  addtoCart: async (req, res) => {
    const userId = req.params.id;
    const ProductId = req.body.ProductId;
    const totalprice = req.body.totalprice;
    const quantity = req.body.quantity;
    const productid = JSON.stringify(ProductId);
    let count;
    try {
      const existingProduct = await Cart.findOne({ userId, ProductId });
      //const product = await Product.findById(ProductId);
      //console.log(product);
      count = await Cart.countDocuments({ userId });
      if (existingProduct) {
        (existingProduct.ProductId[0].quantity+=1),
          (existingProduct.totalprice += totalprice);

        await existingProduct.save();
      } else {
        const existingcart = await Cart.findOne({userId});
        const totalvalue = req.body.totalprice;
        const producctid=req.body.ProductId
        if (existingcart) {
          existingcart.ProductId.push(producctid);
          existingcart.totalprice += totalvalue;
          existingcart.quantity += 1;
          await existingcart.save();
        } else {
          const newCart = new Cart({
            userId: userId,
            ProductId: req.body.ProductId,
            addtivies: req.body.Addtivies,
            totalprice: req.body.totalprice,
            quantity: req.body.quantity,
          });
          await newCart.save(); 
        }

        count = await Cart.countDocuments({ userId });
      }
      res.status(200).json({ message: "Success", count: count });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },  
  

  removeProductfromCart: async (req, res) => {
    const itemId = req.body.id;
    const userId = req.params.id;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        res.status(404).json("cart NOt found");
      }
      await Cart.findByIdAndDelete({ _id: itemId });
      let count = await cart.countDocuments({ userId });
      res.status(200).json({ count: count });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  fetchuserCart: async (req, res) => {
    const userid = req.params.id;
    try {
      const usercart = await Cart.find({ userId: userid }).populate({
        path: "ProductId",
        select: "title price quantity",
      });
      res.status(200).json(usercart);
      console.log(usercart);
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
    const { Productid, totalprice, quantity } = req.body;
    let count;
    try {
      const existingProduct = await Cart.findOne({ userId, Productid });
      count = await Cart.countDocuments({ userId });
      if (existingCart.quantity > 1) {
        (existingProduct.quantity -= 1),
          (existingProduct.totalprice -= totalprice),
          await existingProduct.save();
      } else {
        await Cart.findByIdAndDelete({ _id: itemId });
        let count = await cart.countDocuments({ userId });
        return res.status(200).json({ count: count });
      }
      res.status(200).json({ message: "Success", count: count });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
