const router= require("express").Router()
const {verifyAndAAuthorization} =require('../middleware/verifyToken')
const Mypet= require("../controllers/mypet")

router.post("/createpet/:id",Mypet.createpet)
router.post("/petlogin",Mypet.loginuser)

module.exports=router