const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const admin = require("firebase-admin");
const AnimalShop = require("../models/Animalsshop");

module.exports = {
  createuser: async (req, res) => {
    const user = req.body;
    try {
      // Check if the email is already registered in Firebase Auth
      await admin.auth().getUserByEmail(user.email);
      return res.status(400).json({ message: "The email is already registered" });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        try {
          // Create a new user in Firebase Auth
          const userResponse = await admin.auth().createUser({
            email: user.email,
            emailVerified: false,
            password: user.password,
            disabled: false,
          });

          // Encrypt the password before storing it in MongoDB
          const encryptedPassword = Crypto.AES.encrypt(user.password, process.env.SECRET_KEY).toString();

          // Create a new user in MongoDB
          const newUser = new User({
            username: user.username,
            email: user.email,
            password: encryptedPassword,
            uid: userResponse.uid,
            phone: user.phone,
            userType: user.userType,
            aadhar_Number: user.aadhar_Number,
          });

          await newUser.save();
          return res.status(201).json({ message: "User created successfully" });
        } catch (error) {
          // Handle duplicate key errors for phone number and Aadhar number
          if (error.code === 11000) {
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
  register:async(req,res)=>{
    const {username,phone,aadhar_Number,email,password}=req.body
    try{
    const user=await User.findOne({email:email});
    if(user){
      return res.status(400).json({message:"User already exists"})
    }
    const userResponse = await admin.auth().createUser({
      email: user.email,
      emailVerified: false,
      password: user.password,
      disabled: false,
    });
    const encryptedPassword = Crypto.AES.encrypt(password, process.env.SECRET_KEY).toString();
    const newUser= new User({username,phone,aadhar_Number, uid: userResponse.uid,email,password:encryptedPassword});
    await newUser.save();
    res.status(200).json({message:"User created successfully"})
  }catch(error){
    if (error.code === 11000) {
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

  },

  loginuser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Wrong credentials provided. Please provide a valid email" });
      }

      // Decrypt the password stored in MongoDB
      const decryptedPassword = Crypto.AES.decrypt(user.password, process.env.SECRET_KEY);
      const decryptedPass = decryptedPassword.toString(Crypto.enc.Utf8);
      if (decryptedPass !== req.body.password) {
        return res.status(401).json({ message: "Wrong password provided" });
      }

      // Find vendor information if the user is a vendor
      const vendor = await AnimalShop.find({ owner: user._id });

      // Generate a JWT token
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

      // Exclude sensitive fields before sending the user data
      const { password, __v, createdAt, ...userData } = user._doc;
      res.status(200).json({ ...userData, token: userToken, vendor });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  },
  signIn: async(req,res)=>{
    try{
      const {email} = req.body;
      const user = await User.findOne({ email:email });
      if (!user) {
        return res.status(401).json({ message: "Wrong credentials provided. Please provide a valid email" });
      }
      const decryptedPassword = Crypto.AES.decrypt(user.password, process.env.SECRET_KEY);
      const decryptedPass = decryptedPassword.toString(Crypto.enc.Utf8);
      if (decryptedPass !== req.body.password) {
        return res.status(401).json({ message: "Wrong password provided" });
      }
      const vendor = await AnimalShop.find({ owner: user._id });

      // Generate a JWT token
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

      // Exclude sensitive fields before sending the user data
      const { password, __v, createdAt, ...userData } = user._doc;
      res.status(200).json({ ...userData, token: userToken, vendor });

    }catch(error){
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
}
}
