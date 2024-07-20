const Delivery = require("../models/delivary");
module.exports = {
  createDelivery: async (req, res) => {
    try{
    const {
      name,
      mobileNumber,
      houseType,
      area,
      street,
      landmark,
      village,
      city,
      pincode,
      state,
    } = req.body;
    if (
      !name ||
      !mobileNumber ||
      !houseType ||
      !area ||
      !street ||
      !landmark ||
      !village ||
      !city ||
      !pincode ||
      !state
    ) {
      return res.status(422).json({ error: "  all the fields are required" });
    }
    const newdelivery = new Delivery({
      name,
      mobileNumber,
      houseType,
      area,
      street,
      landmark,
      village,
      city,
      pincode,
      state,
    });
    await newdelivery.save()
    return res.status(200).json({
      message: "Delevery created successfully",
  })
}catch(error) {
  return res.status(500).json({ error: error.message });
}
},
getAddress: async (req, res) => {
  try {
    const delivery = await Delivery.find();
    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
}