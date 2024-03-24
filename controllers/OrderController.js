const Order = require("../models/Order");

module.exports = {
  getUserorders: async (req, res) => {
    const userId = req.params.id;
    try {
      const userorder = await Order.find({userId:userId})
        .populate({
          path: "productId",
          select: "-description -productlocation",
        })
        .exec();
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
  
};
