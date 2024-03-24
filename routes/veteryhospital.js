const router= require("express").Router()
const hospital= require("../controllers/vertinaryhospital")

router.post("/",hospital.createhospital);
router.get("/gethospital/:id",hospital.getHospitals)
router.get("/getallhospitals",hospital.getallHospitals);

module.exports = router