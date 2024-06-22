const router= require("express").Router()
const {verifyAndAAuthorization} =require('../middleware/verifyToken')
const Hospital= require("../controllers/HospitalController")

router.post("/create",Hospital.createHospital)
router.get("/get/:id",Hospital.getHospital)
module.exports = router 