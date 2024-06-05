const router= require("express").Router()
const {verifyAdmin} =require('../middleware/verifyToken')
const Aboutepet = require("../controllers/aboutepet")

router.post("/create",Aboutepet.createaboute);
router.get("/dog",Aboutepet.getallDog)

module.exports=router