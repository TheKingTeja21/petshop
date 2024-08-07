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
      res.status(400).json({ message: "The email is already registered" });
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
            password: Crypto.AES.encrypt(
              user.password,
              process.env.SECRET_KEY
            ).toString(),
            uid: userResponse.uid,
            phone: user.phone,
            userType: user.userType,
            aadhar_Number: user.aadhar_Number,
          });

          await newUser.save();
          res.status(201).json({ message: "Success" });
        } catch (error) {
          if (error.code === 11000) { // Duplicate key error
            if (error.keyValue.phone) {
              res.status(400).json({ message: "Phone number is already registered" });
            } else if (error.keyValue.aadhar_Number) {
              res.status(400).json({ message: "Aadhar number is already registered" });
            } else {
              res.status(500).json({ message: "An error occurred", error: error.message });
            }
          } else {
            res.status(500).json({ message: "An error occurred", error: error.message });
          }
        }
      } else {
        res.status(500).json({ message: "An error occurred", error: error.message });
      }
    }
  },
  
  loginuser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
       return res.status(401).json({message:"Wrong credentials provided a valid gmail"});
      }
      const decryptedpassword = Crypto.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      );
      console.log(user._id);
      const vendor = await AnimalShop.find({owner:user._id})
      const decryptedpass = decryptedpassword.toString(Crypto.enc.Utf8);
      if(decryptedpass !== req.body.password){
        return res.status(401).json("wrong password provided");}
      const userToken = jwt.sign(
        {
          id: user.id,
          usertype: user.userType,
          username: user.username,
          email: user.email,
          aadhar_Number:user.aadhar_Number,
          phone:user.phone,
          address: user.address,
          profile:user.profile,
        },
        process.env.SECRET_KEY_jWT,
        { expiresIn: "7d" }
      );

      const { password, __v, createdAt, ...userData } = user._doc;
      res.status(200).json({ ...userData, token: userToken,vendor :vendor });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
 
};