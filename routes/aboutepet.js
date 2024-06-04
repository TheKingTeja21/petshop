const router= require("express").Router()
const {verifyAdmin} =require('../middleware/verifyToken')
const Aboutepet = require("../controllers/aboutepet")

router.post("/",Aboutepet.createaboute)

module.exports =router