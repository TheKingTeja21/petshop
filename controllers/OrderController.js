const Order = require("../models/Order");

module.exports = {
  getUserorders: async (req, res) => {
    const userId = req.params.id;
    try {
      const userorder = await Order.find({userId:userId})
        .populate({
          path: "productId",
          select: "-description -productlocation",
        }).exec()
      res.status(200).json(userorder);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  OrdercratedOrder: async (req, res) => { 
    try {
      const { userId,productId,quantity,subtotal,total,payment_status,delivery_status,sellerId,payment_id,imageurl} = req.body;
      const order = new Order({
        userId: userId,
        productId: productId,
        quantity: quantity,
        subtotal: subtotal,
        total:total,
        payment_status:payment_status,
        delivery_status:delivery_status,
        sellerId:sellerId,
        payment_id:payment_id,
        imageurl: imageurl,

      })
      await order.save();
      res.status(200).json("success Order Success");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  changeOrderstatus: async (req, res) => {
    const Orderid= req.params.id
    const staus= req.body
    try {
      const order = await Order.findByIdAndUpdate(Orderid,staus,{new:true,
        runValidators:true
      })
      
      if(!order){
        return res.status(404).json("Order Not Found")
      }
      console.log(order);
      await order.save();
      res.status(201).json("Successfull Update")
    } catch (error) {
      res.status(500).json(error)
      
    }
  },
  vendordera:async (req,res)=>{
    sellerId = req.params.id;
    try {
      const resopne = await Order.find({sellerId:sellerId})
      if(!resopne){
        return res.status(404).json("NO ORDERS FOUND")
      }
      console.log(resopne);
      res.status(200).json(resopne)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  
};
