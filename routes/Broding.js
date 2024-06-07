const router = require("express").Router();
const broding= require("../controllers/Broding")

router.post("/createbroding",broding.createbroding)


module.exports =router