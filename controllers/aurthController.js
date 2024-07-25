const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const admin = require("firebase-admin");
const AnimalShop = require("../models/Animalsshop");

module.exports = {
  createuser: async (req, res) => {
    const user = req.body;
    try {
      await admin.auth().getUserByEmail(user.email);
      return res.status(400).json({ message: "The email is already registered" });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        try {
          const userResponse = await admin.auth().createUser({
            email: user.email,
            emailVerified: false,
            password: user.password,
            disabled: false,
          });

          const newUser = new User({
            username: user.username,
            email: user.email,
            password: Crypto.AES.encrypt(user.password, process.env.SECRET_KEY).toString(),
            uid: userResponse.uid,
            phone: user.phone,
            userType: user.userType,
            aadhar_Number: user.aadhar_Number,
          });

          await newUser.save();
          return res.status(201).json({ message: "Success" });
        } catch (error) {
          if (error.code === 11000) { // Duplicate key error
            if (error.keyValue.phone) {
              return res.status(400).json({ message: "Phone number is already registered" });
            } else if (error.keyValue.aadhar_Number) {
              return res.status(400).json({ message: "Aadhar number is already registered" });
            } else {
              return res.status(500).json({ message: "An error occurred", error: error.message });
            }
          } else {
            return res.status(500).json({ message: "An error occurred", error: error.message });
          }
        }
      } else {
        return res.status(500).json({ message: "An error occurred", error: error.message });
      }
    }
  },
  
  loginuser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Wrong credentials provided. Please provide a valid email" });
      }

      const decryptedpassword = Crypto.AES.decrypt(user.password, process.env.SECRET_KEY);
      const decryptedpass = decryptedpassword.toString(Crypto.enc.Utf8);
      if (decryptedpass !== req.body.password) {
        return res.status(401).json({ message: "Wrong password provided" });
      }

      const vendor = await AnimalShop.find({ owner: user._id });

      const userToken = jwt.sign(
        {
          id: user.id,
          usertype: user.userType,
          username: user.username,
          email: user.email,
          aadhar_Number: user.aadhar_Number,
          phone: user.phone,
          address: user.address,
          profile: user.profile,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );

      const { password, __v, createdAt, ...userData } = user._doc;
      res.status(200).json({ ...userData, token: userToken, vendor });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  },
};
