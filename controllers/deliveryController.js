const Delivery = require("../models/delivary");
module.exports = {
  createDelivery: async (req, res) => {
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
  },
};
